import { prisma } from "../../../../../generated/prisma-client";
import { generatorSecret } from "../../../../utils/common";
import sha256 from "sha256";

export default {
  Mutation: {
    UserSignUp: async (_, args) => {
      const { userId, password, needHelp, equipment, sex } = args;

      const authSecret = generatorSecret();
      const existsUserId = await prisma.$exists.user({ userId });
      const securePassword = sha256(password + authSecret);

      if (existsUserId) {
        throw Error("이미 가입된 아이디 입니다.");
      }

      try {
        await prisma.createUser({
          userId,
          password: securePassword,
          authSecret,
          sex,
          needHelp,
          equipment,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
