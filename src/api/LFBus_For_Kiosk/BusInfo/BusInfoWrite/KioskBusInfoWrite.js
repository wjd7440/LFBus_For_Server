import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    KioskBusInfoWrite: async (_, args) => {
      const { carRegNo, busType } = args;
      try {
        await prisma.createBusInfo({
          carRegNo,
          busType,
        });

        console.log("KioskBusInfoWrite");

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
