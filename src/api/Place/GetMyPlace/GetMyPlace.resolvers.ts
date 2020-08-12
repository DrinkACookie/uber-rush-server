import User from "../../../entities/User";
import { GetMyPlacesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: privateResolver(
      async (_, __, { req }): Promise<GetMyPlacesResponse> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["places"] }
          );

          if (user) {
            const sortedPlaces = await Place.find({
              where: { userId: req.user.id },
              order: { isFav: "DESC" },
            });
            if (sortedPlaces) {
              return {
                ok: true,
                places: sortedPlaces,
                error: null,
              };
            } else {
              return {
                ok: true,
                places: null,
                error: null,
              };
            }
          } else {
            return {
              ok: false,
              places: null,
              error: "User not found",
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            places: null,
          };
        }
      }
    ),
  },
};
export default resolvers;
