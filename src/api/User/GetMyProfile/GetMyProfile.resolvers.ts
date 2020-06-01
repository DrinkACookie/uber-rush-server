import { Resolvers } from "../../../types/resolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: async (_, __, { req }) => {
      const { user } = req;
      return {
        ok: true,
        error: null,
        user,
      };
    },
  },
};
export default resolvers;
