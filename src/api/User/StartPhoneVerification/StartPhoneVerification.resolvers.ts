import { Resolvers } from "../../../types/resolver";
import { StartPhoneVerificationMutationArgs, StartPhoneVerificationResponse } from "../../../types/graph";
import Verification from "../../../entities/Verification";

const resolver: Resolvers = {
        Mutation: {
                StartPhoneVerifiction: async (_, args: StartPhoneVerificationMutationArgs): Promise<StartPhoneVerificationResponse> => {
                        const { phoneNumber } = args;
                        try {
                                const existingVerification = await Verification.findOne({ payload: phoneNumber });
                                if (existingVerification) {
                                        existingVerification.remove();
                                }
                        } catch (error) {
                                return {
                                        ok: false,
                                        error: error.message
                                }
                        }
                }
        }
};