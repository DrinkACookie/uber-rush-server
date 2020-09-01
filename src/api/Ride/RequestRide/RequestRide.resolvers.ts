import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  RequestRideMutationArgs,
  RequestRideResponse,
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolver";
import privateResolver from "../../../utils/privateResolver";
import Chat from "src/entities/Chat";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        console.log("FUCK L:  ", args);

        if (!user.isRiding && !user.isDriving) {
          try {
            const ride = await Ride.create({
              ...args,
              passenger: user,
            }).save();
            pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
            user.isRiding = true;
            user.save();
            const chat = await Chat.create({
              driver: ride.passenger,
              passenger: ride.passenger,
            }).save();
            ride.chat = chat;
            ride.save();
            return {
              ok: true,
              error: null,
              ride,
            };
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              ride: null,
            };
          }
        } else {
          return {
            ok: false,
            error: "You can't request two rides or drive and request",
            ride: null,
          };
        }
      }
    ),
  },
};
export default resolvers;
