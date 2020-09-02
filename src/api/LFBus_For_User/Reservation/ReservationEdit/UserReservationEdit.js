import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    UserReservationEdit: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      const { departureStation, equipment, memo } = args;
      const { account } = request;

      try {
        await prisma.updateReservation({
          where: { id: account.id },
          data: {
            departureStation,
            equipment,
            memo,
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
