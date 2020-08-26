import { prisma } from "../../../../../generated/prisma-client";
import { generateToken } from "../../../../utils/common";
import sha256 from "sha256";

export default {
  Mutation: {
    UserSignIn: async (_, args) => {
      const { userId, password } = args;
      const exists = await prisma.$exists.user({ userId });

      if (!exists) {
        throw Error("가입된 아이디가 아닙니다.");
      }

      const user = await prisma.user({ userId });
      const securePassword = sha256(password + user.authSecret);

      if (user.password === securePassword) {
        return generateToken(user.id);
      } else {
        throw Error("로그인정보가 다릅니다. 아이디, 비밀번호를 확인해주세요.");
      }
    },
  },
};
