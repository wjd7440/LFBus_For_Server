import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    UserReservationDelete: async (
      _,
      args,
      { request, isUserAuthenticated }
    ) => {
      isUserAuthenticated(request);
      const { account } = request;

      try {
        await prisma.updateReservation({
          where: { id: account.id },
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
