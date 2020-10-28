import { prisma } from "../../../../../generated/prisma-client";
import { expoPush } from "../../../../utils/fcm";

export default {
  Mutation: {
    UserMaileageWrite: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      console.log(request)
      const {
        userId,
        account
      } = args;
      console.log(args);
      try {
        await prisma.createMaileage({
          userId: userId,
          account: account
        });

        await prisma.updateUser({
          data: { maileage: user.maileage + account },
          where: { id: userId },
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
