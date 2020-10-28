import { prisma } from "../../../../../generated/prisma-client";
import { expoPush } from "../../../../utils/fcm";

export default {
  Mutation: {
    UserMaileageWrite: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);

      const { account } = request;
      const {
        maileage
      } = args;
      const user = await prisma.user({ id: account.id });

      try {
        await prisma.createMaileage({
          userId: user.id,
          account: maileage
        });

        await prisma.updateUser({
          data: { maileage: user.maileage + maileage },
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
