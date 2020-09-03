import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserReservationList: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      const { orderBy, skip, after, before, first, last } = args;
      const { account } = request;
      console.log(account);
      let where = {
        user: { id: account.id },
        status: "S",
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

      return { reservations, count };
    },
  },
};
