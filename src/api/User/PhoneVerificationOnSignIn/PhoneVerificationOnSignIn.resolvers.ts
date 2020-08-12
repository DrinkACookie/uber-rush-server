import { Resolvers } from "../../../types/resolver";
import {
  PhoneVerificationOnSignInMutationArgs,
  PhoneVerificationOnSignInResponse,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
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
          error: error.message||null,
        };
      }
      return{
        ok:false,
        error: "비 정상적인 수행"
      }
    },
  },
};

export default resolvers;
