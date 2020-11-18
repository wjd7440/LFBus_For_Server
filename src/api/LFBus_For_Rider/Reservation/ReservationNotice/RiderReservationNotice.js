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

      console.log("예약")          
      console.log(reservations)    
      const count = await prisma
        .reservationsConnection({
          where,
        })
        .aggregate()
        .count();        
//         console.log("1 : " + count)
//         if(!count) {
//           await prisma.updateReservation({
//             data: { notice: true },
//             where: { id: reservations[0].id }
//           });
//         }  
// console.log("2 : " + count)
      return { reservations, count };
    },
  },
};
