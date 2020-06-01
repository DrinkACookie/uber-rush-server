import { Resolvers } from "../../../types/resolver";
import { EmailSignInMutationArgs, EmailSignUpResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
        Mutation: {
                EmailSignUp: async (_, args: EmailSignInMutationArgs): Promise<EmailSignUpResponse> => {
                        const { email } = args;
                        try {
                                const existingUser = await User.findOne({ email });
                                if (existingUser) {
                                        return {
                                                ok: "false",
                                                error: "you should log in instead",
                                                token: null
                                        }
                                } else {
                                        await User.create({ ...args }).save();
                                }
                        } catch (error) {
                                return {
                                        ok: "false",
                                        error: "error.message",
                                        token: null

                                }
                        }
                }
        }
}

export default resolvers;