import { Resolvers } from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";
import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }
      ): Promise<CompleteEmailVerificationResponse> => {
        const { user } = req;
        const { key } = args;
        if (user.email) {
          try {
            const verification = await Verification.findOne({
              key,
              payload: user.email,
            });
            if (verification) {
              user.verificatedEmail = true;
              user.save();
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "Can not Verification",
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
            };
          }
        } else {
          return {
            ok: false,
            error: "No email to verify",
          };
        }
      }
    ),
  },
};

export default resolvers;
