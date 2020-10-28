import { prisma } from "../../../../../generated/prisma-client";
import { expoPush } from "../../../../utils/fcm";

export default {
  Mutation: {
    UserMaileageWrite: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);

      const { account } = request;
      console.log(account)
      const {
        userId,
        maileage
      } = args;
      console.log(args);
      try {
        await prisma.createMaileage({
          userId: userId,
          account: maileage
        });

        await prisma.updateUser({
          data: { maileage: account.maileage + maileage },
          where: { id: account },
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
