import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    RiderBusInfoSeat1Edit: async (_, args) => {
      const { SEAT1, CAR_REG_NO } = args;

      try {
        await prisma.updateUser({
          where: { CAR_REG_NO: CAR_REG_NO },
          data: {
            SEAT1,
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
