import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusRouteList: async (_, args) => {
      const { ROUTE_TP ,orderBy, skip, after, before, first, last } = args;
      
      let where = {
        ROUTE_TP: ROUTE_TP,
      };

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
        .busRoutesConnection({ where, })
        .aggregate()
        .count();

      return { busRoutes, count };
    },
  },
};
