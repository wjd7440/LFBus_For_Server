import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusRoute: async (_) => {
      return await prisma.busRoute();
    },
  },
};
