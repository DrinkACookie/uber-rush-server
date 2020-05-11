import * as dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";
import app from "./app";
import connectionOptions from "./ormConfig";
import { createConnection } from "typeorm";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions).then(() => {
  app.start(appOptions, handleAppStart);
});
