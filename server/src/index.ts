require('dotenv-flow').config();

import * as Server from "./server";
import * as DB from "./db";

const start = async () => {
  try {
    const db = DB.init();
    const server = await Server.init(db);
    await server.start();
  } catch (err) {
    console.error("Error starting server: ", err.message);
    throw err;
  }
};

start()