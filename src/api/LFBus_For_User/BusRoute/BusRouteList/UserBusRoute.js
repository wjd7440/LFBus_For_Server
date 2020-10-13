import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusRouteList: async (_, args) => {
      const { orderBy, skip, after, before, first, last } = args;
      
      const busRoutes = await prisma.busRoutes({
        where,
        orderBy,
        skip, //offset
        after,
        before,
        first, //limit
        last,
      });

      const count = await prisma
        .busRoutesConnection()
        .aggregate()
        .count();

      return { busRoutes, count };
    },
  },
};
