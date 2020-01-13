import * as Hapi from "@hapi/hapi";
import { IDatabase } from "./models";
import getConnectRoutes from "./general/connect";
import getOrganisationRoutes from "./organisation/routes";
import getUserRoutes from "./user/routes";
import getAssetRoutes from "./asset/routes";

export default function(
    server: Hapi.Server,
    database: IDatabase
  ) {
    getConnectRoutes(server,database);
    getOrganisationRoutes(server, database);
    getUserRoutes(server, database);
    getAssetRoutes(server, database);
};