import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    RiderBusInfoDeviceTokenEdit: async (_, args) => {
      const { deviceToken, CAR_REG_NO } = args;

      try {
        await prisma.updateBusInfo({
          where: { CAR_REG_NO: CAR_REG_NO },
          data: {
            deviceToken,
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
