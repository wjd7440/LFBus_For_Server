import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    UserBusEndStationDetail: async (_, args) => {
      const { END_NODE_ID } = args;

      return await prisma.busStation({
        BUS_NODE_ID: END_NODE_ID,
      });
    },
  },
};
