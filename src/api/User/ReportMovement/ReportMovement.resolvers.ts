import { Resolvers } from "../../../types/resolver";
import {
  ReportMovementResponse,
  ReportMovementMutationArgs,
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    ReportMovement: privateResolver(
      async (
        _,
        args: ReportMovementMutationArgs,
        { req, pubSub }
      ): Promise<ReportMovementResponse> => {
        const user: User = req.user;
        const notNull = cleanNullArgs(args);
        console.log(notNull, user);
        try {
          const tr = await User.update({ id: user.id }, { ...notNull });
          console.log(tr);

          pubSub.publish("driverUpdate", { DriversSubscription: user });
          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.massage,
          };
        }
      }
    ),
  },
};

export default resolvers;
