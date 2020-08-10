import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    KioskBusInfoList: async (_, args) => {
      const { CAR_REG_NUM } = args;

      const busInfos = await prisma.busInfos({where : CAR_REG_NUM});

      const count = await prisma
        .busInfosConnection({where : CAR_REG_NUM})
        .aggregate()
        .count();

      return { busInfos, count };
    },
  },
};
