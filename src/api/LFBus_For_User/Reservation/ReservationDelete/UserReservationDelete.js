import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    UserReservationDelete: async (_, args) => {
      const { id } = args;

      try {
        await prisma.updateReservation({
          where: { id: id },
          data: {
            status: "D",
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
