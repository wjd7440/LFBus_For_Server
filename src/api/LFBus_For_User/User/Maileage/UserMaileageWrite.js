import { prisma } from "../../../../../generated/prisma-client";
import { expoPush } from "../../../../utils/fcm";

export default {
  Mutation: {
    UserMaileageWrite: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);

      const { account } = request;
      const {
        userId,
        maileage
      } = args;
      const user = await prisma.user({ where: { id: account.id } });
      console.log(user);
      try {
        await prisma.createMaileage({
          userId: userId,
          account: maileage
        });

        await prisma.updateUser({
          data: { maileage: user.maileage + maileage },
          where: { id: account.id },
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
