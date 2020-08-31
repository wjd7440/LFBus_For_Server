import { prisma } from "../../../../../generated/prisma-client";
import sha256 from "sha256";

export default {
  Mutation: {
    UserTokenUpdate: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      const { account } = request;
      const { userId, password, deviceToken } = args;

      const user = await prisma.user({ userId });
      const securePassword = sha256(password + user.authSecret);

      if (user.password === securePassword) {
        try {
          await prisma.updateUser({
            where: { id: account.id },
            data: {
              deviceToken: deviceToken,
            },
          });
          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      } else {
        return false;
      }
    },
  },
};
