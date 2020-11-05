import { prisma } from "../../../../../generated/prisma-client";
import { expoPush } from "../../../../utils/fcm";

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
        equipmentName,
        memo,
        deviceToken,
      } = args;
      console.log(args);
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

        if (deviceToken) {
          expoPush({
            deviceToken: deviceToken,
            data: {},
            notification: {
              title: "승차예약",
              body: `승차예약이 있습니다.`,
            },
          });
          console.log("가라푸시");
        }

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
