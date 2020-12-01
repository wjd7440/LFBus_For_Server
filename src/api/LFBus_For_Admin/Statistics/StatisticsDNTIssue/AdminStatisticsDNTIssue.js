import { prisma } from "../../../../../generated/prisma-client";
import mysql from "mysql2/promise";
import { dbConfig } from "../../../../../config/db.config";
const pool = mysql.createPool(dbConfig);

export default {
  Query: {
    AdminStatisticsDNTIssue: async (
      _,
      args,
      { request, isAdminAuthenticated }
    ) => {
      isAdminAuthenticated(request);
      const { startDate, endDate } = args;

      const connection = await pool.getConnection(async conn => conn);
      try {
        //기부포인트 발행금액(횟수)
        let DNTIssueQuery =
          `SELECT SUBSTRING(createdAt, 1, 10) AS date, CAST(count(*) AS signed integer) AS count, CAST(IFNULL(SUM(value), 0) AS signed integer) AS total ` +
          `FROM Ledger  ` +
          `WHERE transactionType = 'Charge' AND currency = 'DNT' ` +
          `AND createdAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' ` +
          `GROUP BY SUBSTRING(createdAt, 1, 10) ` +
          `ORDER BY SUBSTRING(createdAt, 1, 10) DESC `;
        var [rows] = await connection.query(DNTIssueQuery, []);
        const DNTIssueList = rows;

        return {
          list: DNTIssueList
        };
      } finally {
        connection.release();
      }
    }
  }
};
