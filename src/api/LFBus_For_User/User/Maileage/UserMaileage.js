import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserMaileageList: async (_, args, { request, isUserAuthenticated }) => {
      const { orderBy, skip, after, before, first, last } = args;
      isUserAuthenticated(request);

      const { account } = request;
      const user = await prisma.user({ id: account.id });
      console.log(user)
      let where = {
        userId: user.id,
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
