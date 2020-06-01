import * as cors from "cors";
import { GraphQLServer } from "graphql-yoga";
import * as helmet from "helmet";
import * as logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { NextFunction } from "express";

class App {
  public app: GraphQLServer;
  constructor() {
    this.app = new GraphQLServer({
      schema,
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };
  private jwt = async (
    req,
    res: Express.Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");
    if (token) {
      const user = await decodeJWT(token);
      if (user) {
        req.user = user;
      } else {
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;
