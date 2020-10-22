import { prisma } from "../../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusTurnStationDetail: async (_, args) => {
      const { TURN_NODE_ID } = args;
      return await prisma.busStation({
        BUS_NODE_ID: TURN_NODE_ID,
      });
    },
  },
};
