import User from "../../../entities/User";
import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolver";
import createJWT from "../../../utils/createJWT";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email,lastName,firstName,password,phoneNumber,age, } = args;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: "you should log in instead",
            token: null,
          };
        } else {
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true,
          });
          if (phoneVerification) {
            const newUser = await User.create({email,lastName,firstName,password,phoneNumber,age,  }).save();
            if (newUser.email) {
              const emailVerification = await Verification.create({
                payload: newUser.email,
                target: "EMAIL",
              }).save();
              try {
                await sendVerificationEmail(
                  newUser.fullName,
                  emailVerification.key
                );
              } catch (error) {
                return {
                  ok: false,
                  error,
                  token: null,
                };
              }
            }
            const token = createJWT(newUser.id);
            return {
              ok: true,
              error: null,
              token,
            };
          } else {
            return {
              ok: false,
              error: "You haven't verified your phone number",
              token: null,
            };
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
