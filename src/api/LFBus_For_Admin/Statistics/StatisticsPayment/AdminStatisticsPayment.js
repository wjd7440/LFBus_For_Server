import { prisma } from "../../../../../generated/prisma-client";
import mysql from "mysql2/promise";
import { dbConfig } from "../../../../../config/db.config";
const pool = mysql.createPool(dbConfig);

export default {
  Query: {
    AdminStatisticsPayment: async (
      _,
      args,
      { request, isAdminAuthenticated }
    ) => {
      isAdminAuthenticated(request);
      const { startDate, endDate } = args;

      const connection = await pool.getConnection(async conn => conn);
      try {
        //기부포인트 발행금액(횟수)
        let PaymentQuery =
          `SELECT SUBSTRING(updatedAt, 1, 10) AS date, CAST(count(*) AS signed integer) AS count, CAST(IFNULL(SUM(value), 0) AS signed integer) AS total ` +
          `FROM StoreOrder  ` +
          `WHERE commonStatus = 'C' ` +
          `AND updatedAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' ` +
          `GROUP BY SUBSTRING(updatedAt, 1, 10) ` +
          `ORDER BY SUBSTRING(updatedAt, 1, 10) DESC `;
        var [rows] = await connection.query(PaymentQuery, []);
        const PaymentList = rows;

        return {
          list: PaymentList
        };
      } finally {
        connection.release();
      }
    }
  }
};
