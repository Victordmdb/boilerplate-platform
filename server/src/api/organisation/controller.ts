import * as Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";

import { IDatabase } from "api/models";
import { IRequest } from "src/api/_helpers/request";
import { IOrganisation, OrganisationInput, OrganisationFilter } from "./type";
import { parseUserAbilities } from "../user/controller";

export default class OrganisationController {
  private database: IDatabase;

  constructor( database: IDatabase ) {
    this.database = database;
  }

  public async createOrganisation(request: IRequest, h: Hapi.ResponseToolkit) {
    const abilities = parseUserAbilities(request);    
    abilities.throwUnlessCan('create', "Organisation");
    
    const createdBy = request.auth.credentials.id;
    const newOrg = request.payload as OrganisationInput;

    try {
      let organisation: any = await this.database.Organisation.create({...newOrg, createdBy });
      return h.response(organisation).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async updateOrganisation(request: IRequest, h: Hapi.ResponseToolkit) {
    const abilities = parseUserAbilities(request);
    abilities.throwUnlessCan('update', "Organisation");
    const _id = request.params["id"];
    const fields = request.payload as OrganisationInput;

    try {
      let organisation: IOrganisation = await this.database.Organisation.accessibleBy(abilities).findOneAndUpdate(
        { _id },
        { $set: fields },
        { new: true }
      );
      return h.response(organisation).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteOrganisation(request: IRequest, h: Hapi.ResponseToolkit) {
    const abilities = parseUserAbilities(request);
    abilities.throwUnlessCan('delete', "Organisation");

    const _id = request.params["id"];

    let organisation: IOrganisation = await this.database.Organisation.accessibleBy(abilities).findOneAndRemove({_id});

    return organisation;
  }

  public async getOrganisationByName(request: IRequest, h: Hapi.ResponseToolkit) {
    let name = request.params["name"];
    const abilities = parseUserAbilities(request);

    let organisations = await this.database.Organisation.accessibleBy(abilities).findOne({ name }).lean(true);

    if (organisations) {
      return organisations;
    } else {
      return Boom.notFound();
    }
  }

  public async getOrganisations(request: IRequest, h: Hapi.ResponseToolkit) {
    const abilities = parseUserAbilities(request);
    const { top, skip, ...params } = request.query as Partial<OrganisationFilter>;
    let organisations = await this.database.Organisation
      .accessibleBy(abilities)
      .find(params)
      .lean(true)
      .skip(parseInt(skip))
      .limit(parseInt(top));

    return organisations;
  }
}


