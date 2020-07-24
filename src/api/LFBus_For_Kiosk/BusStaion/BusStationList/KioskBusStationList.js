import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    KioskBusStationList: async (_, args) => {
      // const { keyword, orderBy, skip, after, before, first, last } = args;

      // let where = null;

      //   if (keyword) {
      //     where = { ...where, question_contains: keyword };
      //   }

      const busStations = await prisma.busStations();

      const count = await prisma
        .busStationsConnection()
        .aggregate()
        .count();

      return { busStations, count };
    },
  },
};
