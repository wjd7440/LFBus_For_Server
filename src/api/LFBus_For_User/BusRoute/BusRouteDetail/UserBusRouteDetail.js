import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusRouteDetail: async (_, args) => {
      const { ROUTE_CD } = args;
      return await prisma.busRouteDetail({
        ROUTE_CD,
      });
    },
  },
};
