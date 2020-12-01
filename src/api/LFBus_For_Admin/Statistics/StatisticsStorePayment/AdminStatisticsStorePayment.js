import { prisma } from "../../../../../generated/prisma-client";
import mysql from "mysql2/promise";
import { dbConfig } from "../../../../../config/db.config";
const pool = mysql.createPool(dbConfig);

export default {
  Query: {
    AdminStatisticsStorePayment: async (
      _,
      args,
      { request, isAdminAuthenticated }
    ) => {
      isAdminAuthenticated(request);
      const { id, startDate, endDate } = args;

      const connection = await pool.getConnection(async conn => conn);
      try {
        //기부포인트 발행금액(횟수)
        let StorePaymentQuery =
          `SELECT SUBSTRING(StoreOrder.createdAt, 1, 10) AS date, COUNT(value) AS count, SUM(value) AS total ` +
          `FROM Store LEFT OUTER JOIN StoreOrder ON (Store.id = StoreOrder.store)  ` +
          `WHERE Store.id = '${id}' AND StoreOrder.commonStatus = 'C' AND StoreOrder.currency = 'DRM' ` +
          `AND StoreOrder.createdAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' ` +
          `GROUP BY SUBSTRING(StoreOrder.createdAt, 1, 10) ` +
          `ORDER BY SUBSTRING(StoreOrder.createdAt, 1, 10) DESC `;
        var [rows] = await connection.query(StorePaymentQuery, []);
        const StorePaymentList = rows;

        return {
          list: StorePaymentList
        };
      } finally {
        connection.release();
      }
    }
  }
};
