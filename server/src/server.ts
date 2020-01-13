import * as Hapi from "@hapi/hapi";
import addRoutes from './api/routes';

import { IPlugin } from "./plugins/interfaces";
import { IDatabase } from "./api/models";

export async function init( database: IDatabase ): Promise<Hapi.Server> {
    try {
        const PORT = process.env.PORT || 3001;
        const SERVER_URL = process.env.SERVER || "localhost";
        const server = new Hapi.Server({
            debug: { request: ['error'] },
            host: SERVER_URL,
            port: PORT,
            routes: {
                cors: {
                    origin: ["*"]
                }
            }
        });

        // if (configs.routePrefix) {
            // server.realm.modifiers.route.prefix = configs.routePrefix;
        // }

        //  Setup Hapi Plugins

        let plugins: Array<string> = ["logger", "jwt-auth", "yar","cors"];

        if(process.env.NODE === "development") plugins = plugins.concat("swagger");

        let pluginPromises: Promise<any>[] = [];

        plugins.forEach((pluginName: string) => {
            var plugin: IPlugin = require("./plugins/" + pluginName).default();
            pluginPromises.push(plugin.register(server, database));
        });

        await Promise.all(pluginPromises);

        addRoutes(server, database);


        console.log("Server listening at %s:%s", SERVER_URL, PORT);

        return server;
    } catch (err) {
        console.error("Error starting server: ", err);
        throw err;
    }
}
