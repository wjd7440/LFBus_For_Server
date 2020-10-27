import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserMailegeList: async (_, args) => {
      const { userId, orderBy, skip, after, before, first, last } = args;

      let where = {
        userId: userId,
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
