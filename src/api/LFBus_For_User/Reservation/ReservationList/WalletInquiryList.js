import { prisma } from "../../../../../generated/prisma-client";

export default {
  Query: {
    WalletInquiryList: async (_, args, { request, isWalletAuthenticated }) => {
      isWalletAuthenticated(request);
      const { keyword, orderBy, skip, after, before, first, last } = args;
      const { account } = request;

      let where = {
        user: { id: account.id },
      };
      //   if (inquiryCategory) {
      //     where = { ...where, inquiryCategory: { id: inquiryCategory } };
      //   }
      if (keyword) {
        where = {
          ...where,
          question_contains: keyword,
        };
      }

      const inquiries = await prisma.inquiries({
        where,
        orderBy,
        skip, //offset
        after,
        before,
        first, //limit
        last,
      });

      const count = await prisma
        .inquiriesConnection({
          where,
        })
        .aggregate()
        .count();

      console.log("PosInquiryList");

      return { inquiries, count };
    },
  },
};
