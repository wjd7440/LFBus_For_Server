import { prisma } from "../../../generated/prisma-client";

export default {
  Event: {
    eventConfig: ({ id }) => prisma.event({ id }).eventConfig()
  },
  Notice: {
    noticeConfig: ({ id }) => prisma.notice({ id }).noticeConfig()
  },
  Inquiry: {
    inquiryConfig: ({ id }) => prisma.inquiry({ id }).inquiryConfig()
  }
};
