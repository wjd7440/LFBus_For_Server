import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    KioskBusInfoList: async (_, args) => {
      const { orderBy, skip, after, before, first, last } = args;

      const busInfos = await prisma.busInfos({
        where,
        orderBy,
        skip, //offset
        after,
        before,
        first, //limit
        last,
      });

      const count = await prisma
        .busInfosConnection({
          where,
        })
        .aggregate()
        .count();

      return { busInfos, count };
    },
  },
};
