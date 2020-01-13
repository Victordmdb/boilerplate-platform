import * as Hapi from "@hapi/hapi";
import * as Joi from "@hapi/joi";
import AssetController from "./controller";
import * as AssetValidator from "./validator";
import { jwtValidator } from "api/user/validator";
import { IDatabase } from "api/models";

export default function (
  server: Hapi.Server,
  database: IDatabase
) {
  const assetController = new AssetController(database);
  server.bind(assetController);

  server.route([{
    method: "GET",
    path: "/assets/{id}",
    options: {
      handler: assetController.getAssetById,
      auth: "jwt",
      tags: ["api", "assets"],
      description: "Get asset by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        }),
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Asset founded."
            },
            "404": {
              description: "Asset does not exists."
            }
          }
        }
      }
    }
  },{
    method: "GET",
    path: "/assets",
    options: {
      handler: assetController.getAssets,
      auth: "jwt",
      tags: ["api", "assets"],
      description: "Get all assets.",
      validate: {
        query: Joi.object({
          top: Joi.number().default(5),
          skip: Joi.number().default(0)
        }),
        headers: jwtValidator
      }
    }
  },{
    method: "DELETE",
    path: "/assets/{id}",
    options: {
      handler: assetController.deleteAsset,
      auth: "jwt",
      tags: ["api", "assets"],
      description: "Delete asset by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        }),
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Asset."
            },
            "404": {
              description: "Asset does not exists."
            }
          }
        }
      }
    }
  },{
    method: "PUT",
    path: "/assets/{id}",
    options: {
      handler: assetController.updateAsset,
      auth: "jwt",
      tags: ["api", "assets"],
      description: "Update asset by id.",
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        }),
        payload: AssetValidator.updateAssetModel,
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Asset."
            },
            "404": {
              description: "Asset does not exists."
            }
          }
        }
      }
    }
  },{
    method: "POST",
    path: "/assets",
    options: {
      handler: assetController.createAsset,
      auth: "jwt",
      tags: ["api", "assets"],
      description: "Create a asset.",
      validate: {
        payload: AssetValidator.createAssetModel,
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created Asset."
            }
          }
        }
      }
    }
  }]);
}
