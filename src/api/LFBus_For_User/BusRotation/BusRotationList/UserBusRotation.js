import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusRotationList: async (_, args) => {
      const { ROUTE_CD, orderBy, skip, after, before, first, last } = args;

      let where = {
        ROUTE_CD: ROUTE_CD,
      };

      const busRotations = await prisma.busRotations({
        where,
        orderBy,
        skip, //offset
        after,
        before,
        first, //limit
        last,
      });

      const count = await prisma
        .busRotationsConnection({ where, })
        .aggregate()
        .count();

      return { busRotations, count };
    },
  },
};
