import { prisma } from "../../../../../generated/prisma-client";
import { generateToken } from "../../../../utils/common";
import sha256 from "sha256";

export default {
  Mutation: {
    AdminLogIn: async (_, args) => {
      const { userId, password } = args;
      const exists = await prisma.$exists.user({ userId });

      if (!exists) {
        throw Error("가입된 아이디가 아닙니다.");
      }
console.log(userId ,password)
      const user = await prisma.user({ userId });
      const securePassword = sha256(password + user.authSecret);

      // if (user.confirmed !== true) {
      //   throw Error("email 인증 후 로그인을 할 수 있습니다.");
      // }

      // if (user.blocked === true) {
      //   throw Error("차단된 계정입니다.");
      // }

      // if (user.role !== "Administrator" && user.role !== "Issuer") {
      //   throw Error("관리자 계정이 아닙니다.");
      // }

      if (user.password === securePassword) {
        return generateToken(user.id);
      } else {
        throw Error("로그인정보가 다릅니다. 아이디, 비밀번호를 확인해주세요.");
      }
    }
  }
};
