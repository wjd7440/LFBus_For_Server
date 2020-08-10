import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    KioskBusInfoList: async (_, args) => {
      const { CAR_REG_NUM } = args;

      const busInfoes = await prisma.busInfoes({where : CAR_REG_NUM});

      const count = await prisma
        .busInfoesConnection({where : CAR_REG_NUM})
        .aggregate()
        .count();

      return { busInfoes, count };
    },
  },
};
