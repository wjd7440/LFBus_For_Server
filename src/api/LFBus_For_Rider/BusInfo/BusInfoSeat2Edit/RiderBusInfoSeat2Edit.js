import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    RiderBusInfoSeat2Edit: async (_, args) => {
      const { SEAT2, CAR_REG_NO } = args;

      try {
        await prisma.updateUser({
          where: { CAR_REG_NO: CAR_REG_NO },
          data: {
            SEAT2,
          },
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
