import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    RiderCarList: async (_, args) => {
      // const { keyword, orderBy, skip, after, before, first, last } = args;

      // let where = null;

      //   if (keyword) {
      //     where = { ...where, question_contains: keyword };
      //   }

      const cars = await prisma.cars();

      const count = await prisma.carsConnection().aggregate().count();

      return { cars, count };
    },
  },
};
