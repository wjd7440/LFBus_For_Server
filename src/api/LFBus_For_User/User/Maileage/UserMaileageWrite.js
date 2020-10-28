import { prisma } from "../../../../../generated/prisma-client";
import { expoPush } from "../../../../utils/fcm";

export default {
  Mutation: {
    UserMaileageWrite: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      const { user } = request;
      const {
        account
      } = args;
      console.log(args);
      try {
        await prisma.createMaileage({
          userId: { connect: { id: user.id } },
          account: account
        });

        await prisma.updateUser({
          data: { maileage: user.maileage + account },
          where: { id: user.id },
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
