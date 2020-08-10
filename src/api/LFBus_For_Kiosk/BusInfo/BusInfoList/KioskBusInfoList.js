import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    KioskBusInfoList: async (_, args) => {
      const { CAR_REG_NO } = args;

      const busInfoes = await prisma.busInfoes({where : CAR_REG_NO});

      const count = await prisma
        .busInfoesConnection({where : CAR_REG_NO})
        .aggregate()
        .count();

      return { busInfoes, count };
    },
  },
};
