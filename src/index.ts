import * as dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";
import app from "./app";
import connectionOptions from "./ormConfig";
import { createConnection } from "typeorm";
import decodeJWT from "./utils/decodeJWT";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription"; // Client의 webSocket과 동일하게
const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async (connectionParams) => {
      console.log("connectionParams : ", connectionParams);
      const token = connectionParams["X-JWT"];
      if (token) {
        const user = await decodeJWT(token);
        console.log("Finded User by X-JWT : ", user!.fullName);
        if (user) {
          return {
            currentUser: user,
          };
        }
      }
      throw new Error("No JWT. Can't subscribe");
    },
  },
};
const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch((Error) => {
    console.log("error in createConnection : ", Error);
  });
