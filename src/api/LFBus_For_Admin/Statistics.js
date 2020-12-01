import { prisma } from "../../../generated/prisma-client";

export default {
    Reservation: {
        user: ({ id }) => prisma.reservation({ id }).user()
      },
};
