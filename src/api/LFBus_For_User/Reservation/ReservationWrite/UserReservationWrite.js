import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    UserReservationWrite: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      const { account } = request;
      const {
        CAR_REG_NO,
        ROUTE_NO,
        BUS_NODE_ID,
        departureStation,
        arrivalStation,
        equipment,
        memo,
      } = args;
      try {
        await prisma.createReservation({
          status: "S",
          CAR_REG_NO,
          ROUTE_NO,
          user: { connect: { id: account.id } },
          BUS_NODE_ID,
          departureStation,
          arrivalStation,
          equipment,
          memo,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
