import * as Hapi from "@hapi/hapi";
import { IDatabase } from "api/models";
import { IRequest } from "src/api/_helpers/request";
import { HAS_ROOT, checkRoot } from "db";
import Boom from "@hapi/boom";

enum ServerStatus {
    OFFLINE,
    SET_ROOT,
    AVAILABLE
};

export default function(
  server: Hapi.Server,
  database: IDatabase
) {
  server.route({
    method: "GET",
    path: "/status",
    options: {
      auth: false,
      handler: async (request: IRequest, h: Hapi.ResponseToolkit) => {
        try{
            if( !HAS_ROOT ){
                const isRootSet = await checkRoot();
                if(!isRootSet){
                    return ServerStatus[ServerStatus.SET_ROOT];
                };
            };
        
            return ServerStatus[ServerStatus.AVAILABLE];
          } catch(e){
            console.error(e);
            return Boom.resourceGone(ServerStatus[ServerStatus.OFFLINE]);
          }
      },
      tags: ["api","cat"],
      description: "Testing if server is available",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Server Available"
            }
          }
        }
      }
    }
  });
};