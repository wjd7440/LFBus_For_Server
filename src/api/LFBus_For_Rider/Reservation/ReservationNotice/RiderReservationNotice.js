import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    RiderReservationNotice: async (_, args, { request, isUserAuthenticated }) => {
      const { orderBy, skip, after, before, first, last, CAR_REG_NO } = args;

      let where = {
        CAR_REG_NO: CAR_REG_NO,
        notice: false,
      };

      const reservations = await prisma.reservations({
        where,
        orderBy,
        skip, //offset
        after,
        before,
        first, //limit
        last,
      });

      const count = await prisma
        .reservationsConnection({
          where,
        })
        .aggregate()
        .count();        

// console.log(reservations, count);

      reservations.map((rowData, index) => {
        console.log(rowData);
        await prisma.updateReservation({
          data: { notice: true },
          where: { id: rowData.id }
        });
      })        

      return { reservations, count };
    },
  },
};
