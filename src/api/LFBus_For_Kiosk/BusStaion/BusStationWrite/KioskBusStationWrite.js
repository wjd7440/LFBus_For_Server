import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    KioskBusStationWrite: async (_, args) => {
      const { name, busStationNo } = args;
      try {
        await prisma.createBusStation({
          name,
          busStationNo,
        });

        console.log("KioskBusStationWrite");

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
