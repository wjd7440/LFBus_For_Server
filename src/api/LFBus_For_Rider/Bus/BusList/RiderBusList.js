import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    RiderBusList: async (_, args) => {
      // const { keyword, orderBy, skip, after, before, first, last } = args;

      // let where = null;

      //   if (keyword) {
      //     where = { ...where, question_contains: keyword };
      //   }

      const buses = await prisma.buses();

      const count = await prisma.busesConnection().aggregate().count();

      return { buses, count };
    },
  },
};
