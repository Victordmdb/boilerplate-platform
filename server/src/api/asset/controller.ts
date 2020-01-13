import * as Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import { IAsset } from "./type";
import { IDatabase } from "api/models";
import { IRequest } from "src/api/_helpers/request";
import { DocumentType, mongoose, } from "@typegoose/typegoose";

export default class AssetController {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  public async createAsset(request: IRequest, h: Hapi.ResponseToolkit) {
    if(!request.auth.credentials.id) return Boom.badImplementation();
    var newAsset = request.payload as IAsset;
    newAsset.createdBy = mongoose.Types.ObjectId(request.auth.credentials.id);

    try {
      let assets: DocumentType<IAsset> = await this.database.Asset.create(newAsset);
      return h.response(assets).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  };

  public async updateAsset(request: IRequest, h: Hapi.ResponseToolkit) {
    let userId = request.auth.credentials.id;
    let _id = request.params["id"];

    try {
      let assets: DocumentType<IAsset> = await this.database.Asset.findByIdAndUpdate(
        { _id, userId }, //ES6 shorthand syntax
        { $set: request.payload },
        { new: true }
      );

      if (assets) {
        return assets;
      } else {
        return Boom.notFound();
      }
    } catch (error) {
      return Boom.badImplementation(error);
    }
  };

  public async deleteAsset(request: IRequest, h: Hapi.ResponseToolkit) {
    let id = request.params["id"];
    let userId = request["auth"]["credentials"];

    let deletedAsset = await this.database.Asset.findOneAndRemove({
      _id: id,
      userId: userId
    });

    if (deletedAsset) {
      return deletedAsset;
    } else {
      return Boom.notFound();
    }
  }

  public async getAssetById(request: IRequest, h: Hapi.ResponseToolkit) {
    let userId = request.auth.credentials.id;
    let _id = request.params["id"];

    let assets = await this.database.Asset.findOne({ _id, userId })
      .lean(true);

    if (assets) {
      return assets;
    } else {
      return Boom.notFound();
    }
  }

  public async getAssets(request: IRequest, h: Hapi.ResponseToolkit) {
    let userId = request.auth.credentials.id;
    let top = parseInt(request.query["top"] as string) ;
    let skip = parseInt(request.query["skip"] as string);
    let assetss = await this.database.Asset
      .find({ userId: userId })
      .lean(true)
      .skip(skip)
      .limit(top);

    return assetss;
  }
}
