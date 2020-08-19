import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusStationList: async (_, args) => {
      const { northEastLat, northEastLng, southWestLat, southWestLng } = args;

      // let where = null;

      //   if (keyword) {
      //     where = { ...where, question_contains: keyword };
      //   }

      let where = null;
      if (southWestLat && northEastLat) {
        where = {
          ...where,
          AND: [{ GPS_LATI_gte: southWestLat }, { GPS_LATI_lte: northEastLat }],
        };
      }
      if (southWestLng && northEastLng) {
        where = {
          ...where,
          AND: [{ GPS_LONG_gte: southWestLng }, { GPS_LONG_lte: northEastLng }],
        };
      }

      console.log(where);
      const busStations = await prisma.busStations({ where });

      const count = await prisma
        .busStationsConnection({ where })
        .aggregate()
        .count();

      return { busStations, count };
    },
  },
};
