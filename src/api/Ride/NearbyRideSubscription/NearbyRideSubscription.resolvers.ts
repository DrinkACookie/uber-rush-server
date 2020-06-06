import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    NearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"),
        async (payload, __, { context }) => {
          const user: User = context.currentUser;
          const {
            NearbyRideSubscription: {
              // Q) 왜 여기서는 pickUp 인지 검증.
              pickUpLat,
              pickUpLng,
            },
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            pickUpLat >= userLastLat - 0.05 &&
            pickUpLat <= userLastLat + 0.05 &&
            pickUpLng >= userLastLng - 0.05 &&
            pickUpLng <= userLastLng + 0.05
          );
        }
      ),
    },
  },
};

export default resolvers;
