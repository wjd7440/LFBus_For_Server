import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    RiderBusInfoList: async (_, args) => {
      // const { keyword, orderBy, skip, after, before, first, last } = args;

      // let where = null;

      //   if (keyword) {
      //     where = { ...where, question_contains: keyword };
      //   }

      const busInfoes = await prisma.busInfoes();

      const count = await prisma.busInfoesConnection().aggregate().count();

      return { busInfoes, count };
    },
  },
};
