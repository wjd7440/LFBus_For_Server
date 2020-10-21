import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusRouteDetail: async (_, args) => {
      const { ROUTE_CD } = args;
      return await prisma.busRoute({
        ROUTE_CD,
      });
    },
  },
};
