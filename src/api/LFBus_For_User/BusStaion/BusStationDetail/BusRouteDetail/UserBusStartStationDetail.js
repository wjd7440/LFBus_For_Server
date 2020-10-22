import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusStartStationDetail: async (_, args) => {
      const { START_NODE_ID } = args;
      return await prisma.busStation({
        BUS_NODE_ID: START_NODE_ID,
      });
    },
  },
};
