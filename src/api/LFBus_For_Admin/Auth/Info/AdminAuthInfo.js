import { prisma } from "../../../../../generated/prisma-client";
import sha256 from "sha256";

export default {
  Mutation: {
    AdminAuthInfo: async (_, args) => {
      const { userId, password } = args;
      const exists = await prisma.$exists.user({ userId });

      if (!exists) {
        throw Error("가입된 아이디가 아닙니다.");
      }

      const user = await prisma.user({ userId });
      const securePassword = sha256(password + user.authSecret);
      
      return await prisma.user({ userId });
    }
  }
};
