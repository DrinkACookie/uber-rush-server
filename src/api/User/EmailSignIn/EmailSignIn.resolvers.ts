import User from "../../../entities/User";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolver";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "No User found with that email",
            token: null,
          };
        }
        const checkPassword = user.comparePassword(password);
        if (checkPassword) {
          return {
            ok: true,
            error: null,
            token: "Comming soon",
          }
        } else {
          return {
            ok: false,
            error: "wrong password",
            token: null
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};
export default resolvers;