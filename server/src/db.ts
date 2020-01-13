import Mongoose  from 'mongoose';

import { accessibleRecordsPlugin } from '@casl/mongoose';
Mongoose.plugin(accessibleRecordsPlugin);

import Models, { IDatabase } from "./api/models";

const MONGO_URL = process.env.MONGODB_URI;
// const MONGO_URL = `mongodb${process.env.NODE_ENV === "development" ? "" : "+srv"}://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`;
export let HAS_ROOT = false;

export const checkRoot = async () =>{
  const count = await Models.User.estimatedDocumentCount({ "__ROOT__" : true });
  if(count > 1) throw("More than 1 root account, db likely compromised");
  HAS_ROOT = count === 1;
  return HAS_ROOT;
};

export function init(): IDatabase {
  (<any>Mongoose).Promise = Promise;
  Mongoose.connect( MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    reconnectTries: 10, // Try to reconnect 10x
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 120000, // Give up initial connection after 10 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}).then(
  () => console.log("Connected to MongoDB "),
  err => console.log("Error connecting to MongoDB at %s, err", MONGO_URL, err)
);

  if(process.env.NODE_ENV === "development"){
    Mongoose.set('debug', true);
  };

  let mongoDb = Mongoose.connection;

  mongoDb.on("error", err => {
    console.error(`Unable to connect to database: ${MONGO_URL}`, err);
  });

  mongoDb.once("open", async () => {
    await checkRoot();
  });

  

  return Models;
};


export default Mongoose;
