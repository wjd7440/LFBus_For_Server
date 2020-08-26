import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    WalletAuthUserIdChecker: async (_, args) => {
      const { userId } = args;
      const exists = await prisma.$exists.user({ userId });

      if (exists) {
        return true;
      } else {
        return false;
      }
    }
  }
};
