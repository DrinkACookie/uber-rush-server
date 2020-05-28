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
                                const newVerification = await Verification.create({
                                        payload: phoneNumber,
                                        target: "PHONE"
                                }).save();
                                // TO DO : send message 
                        } catch (error) {
                                return {
                                        ok: false,
                                        error: error.message
                                }
                        }
                }
        }
};