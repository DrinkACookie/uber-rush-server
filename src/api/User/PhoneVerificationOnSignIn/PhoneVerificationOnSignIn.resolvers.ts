import { Resolvers } from "../../../types/resolver";
import { PhoneNumber } from "twilio/lib/interfaces";
import {
  PhoneVerificationOnSignInMutationArgs,
  PhoneVerificationOnSignInResponse,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
const resolvers: Resolvers = {
  Mutation: {
    PhoneVerificationOnSignIn: async (
      _,
      args: PhoneVerificationOnSignInMutationArgs
    ): Promise<PhoneVerificationOnSignInResponse> => {
      const { phoneNumber, key } = args;
      try {
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });
        if (!verification) {
          return {
            ok: false,
            error: "Verification key not vaild",
          };
        }
        if (verification) {
          verification.verified = true;
          verification.save();
          return {
            ok: true,
            error: null,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};

export default resolvers;
