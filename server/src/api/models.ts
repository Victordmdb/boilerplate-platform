import { LoggingModel } from "plugins/logging/logging";
import { IUserModel } from "./user/type";
import { IAssetModel } from "./asset/type";
import { IOrganisationModel } from "./organisation/type";

const models = {
  Logging       : LoggingModel,
  Organisation  : IOrganisationModel,
  User          : IUserModel,
  Asset          : IAssetModel,
};

export type IDatabase  = typeof models;

export default models;
