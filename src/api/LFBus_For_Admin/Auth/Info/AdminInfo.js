import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    AdminInfo: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { account } = request;

      return await prisma.user({ id: account.id });
    }
  }
};
