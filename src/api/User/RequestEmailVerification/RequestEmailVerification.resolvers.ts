import { Resolvers } from "../../../types/resolver";
import { RequestEmailVerificationResponse } from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(
      async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
        console.log(req.user);
        const user: User = req.user;
        if (user.email && !user.verifiedEmail) {
          try {
            const oldVerification = await Verification.findOne({
              payload: user.email,
            });
            if (oldVerification) {
              oldVerification.remove;
            }
            const newVerification = await Verification.create({
              payload: user.email,
              target: "EMAIL",
            }).save();
            await sendVerificationEmail(user.fullName, newVerification.key);
            return {
              ok: true,
              error: null,
            };
          } catch (error) {
            return {
              ok: false,
              error,
            };
          }
        } else {
          return {
            ok: false,
            error: "Your user has no email to verify",
          };
        }
      }
    ),
  },
};

export default resolvers;
