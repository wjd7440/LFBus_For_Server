import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusStationList: async (_, args) => {
      const { northEastLat, northEastLng, southWestLat, southWestLng } = args;

      // let where = null;

      //   if (keyword) {
      //     where = { ...where, question_contains: keyword };
      //   }

      let where = [
        { GPS_LATI_gte: northEastLat },
        { GPS_LATI_lte: southWestLat },
        { GPS_LONG_gte: northEastLng },
        { GPS_LONG_lte: southWestLng },
      ];

      const busStations = await prisma.busStations({ where });

      const count = await prisma
        .busStationsConnection({ where })
        .aggregate()
        .count();

      return { busStations, count };
    },
  },
};
