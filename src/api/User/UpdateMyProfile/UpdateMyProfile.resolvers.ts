import { Resolvers } from "../../../types/resolver";
import {
  UpdateMyProfileResponse,
  UpdateMyProfileMutationArgs,
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (_, args: UpdateMyProfileMutationArgs, { req }) => {
        const { user: User } = req.user;
      }
    ),
  },
};

export default resolvers;
