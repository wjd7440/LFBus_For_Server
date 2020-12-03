import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    AdminReservationList: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      const { orderBy, skip, after, before, first, last } = args;

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

      return { reservations, count };
    },
  },
};
