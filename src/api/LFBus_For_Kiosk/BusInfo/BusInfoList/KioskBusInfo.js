import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    KioskBusInfo: async (_, args) => {
      const { CAR_REG_NO } = args;
      return await prisma.busInfo({
        CAR_REG_NO,
      });
    },
  },
};
