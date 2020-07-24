import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    KioskBusStationList: async (_, args) => {
      const { keyword, orderBy, skip, after, before, first, last } = args;

      let where = null;

      //   if (keyword) {
      //     where = { ...where, question_contains: keyword };
      //   }

      const busStations = await prisma.busStations({
        where,
        orderBy,
        skip, //offset
        after,
        before,
        first, //limit
        last,
      });

      const count = await prisma
        .busStationsConnection({
          where,
        })
        .aggregate()
        .count();

      return { busStations, count };
    },
  },
};
