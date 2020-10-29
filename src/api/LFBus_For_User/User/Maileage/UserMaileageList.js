import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserMaileageList: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      const { orderBy, skip, after, before, first, last } = args;
      const { account } = request;

      let where = {
        userId: account.id,
      };

      const maileages = await prisma.maileages({
        where,
        orderBy,
        skip, //offset
        after,
        before,
        first, //limit
        last,
      });

      const count = await prisma
        .maileagesConnection({ where, })
        .aggregate()
        .count();

      return { maileages, count };
    },
  },
};
