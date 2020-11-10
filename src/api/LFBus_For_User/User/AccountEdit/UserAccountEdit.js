import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation: {
    UserAccountEdit: async (_, args, { request, isUserAuthenticated }) => {
      isUserAuthenticated(request);
      const { account } = request;
      const { needHelp, equipment, equipmentName } = args;

      try {
        await prisma.updateUser({
          where: { id: account.id },
          data: {
            needHelp,
            equipment,
            equipmentName
          },
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
