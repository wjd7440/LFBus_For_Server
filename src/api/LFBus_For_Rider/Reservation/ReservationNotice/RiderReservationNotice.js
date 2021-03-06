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
        
        if(count > 0) {
          await prisma.updateManyReservations({
            data: { notice: true },
            where: { notice: false }
          });
        }  

        console.log(reservations, count);
        
      return { reservations, count };
    },
  },
};
