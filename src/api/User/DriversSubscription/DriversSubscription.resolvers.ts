const resolvers = {
  Subscription: {
    DriversSubscription: {
      subscribe: (_, __, { pubSub }) => {
        //subscribe :
        return pubSub.asyncIterator("driverUpdate"); //return asyncIterator
      },
    },
  },
};

export default resolvers;
