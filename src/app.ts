import * as cors from "cors";
import { GraphQLServer, PubSub } from "graphql-yoga";
import * as helmet from "helmet";
import * as logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decodeJWT";
import { NextFunction } from "express";

class App {
  public app: GraphQLServer;
  public pubSub: any;
  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);
    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        const { connection: { context = null } = {} } = req;
        // = null or  = {} 을 사용하면 제대로 의미전달이 안될 수 있다고 함.
        // context에 defualt로 null 을 지정하고,  connection에는 default로 비어있는 값을 지정함
        // connection이 존재하지 않으면 { }을 default 로 가지고, context가 존재하지 않으면 null을 default로 가진다
        return {
          req: req.request,
          pubSub: this.pubSub,
          context,
        };
      },
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    try {
      this.app.express.use(this.jwt);
    } catch (error) {
      console.log("error in jwt middleware: ", error);
    }
  };
  private jwt = async (req, res, next: NextFunction): Promise<void> => {
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
