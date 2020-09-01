import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserInfo: async (_, __, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      const { account } = request;
      const user = await prisma.user({ id: account.id });

      return user;
    },
  },
};
