import { prisma } from "../../../../generated/prisma-client";
import mysql from "mysql2/promise";
import { dbConfig } from "../../../../config/db.config";
const pool = mysql.createPool(dbConfig);

export default {
  Query: {
    AdminStatistics: async (_, args, { request, isAdminAuthenticated }) => {
      isAdminAuthenticated(request);
      const { startDate, endDate } = args;

      /* 소비자 통계 시작 */
      const connection = await pool.getConnection(async conn => conn);
      try {
        //기부포인트 총액
        let DNTTotalQuery =
          `SELECT IFNULL(SUM(amount), 0) AS total ` +
          `FROM Trustline  ` +
          `WHERE currency = 'DNT' `;
        var [[TextRow]] = await connection.query(DNTTotalQuery, []);
        const DNTTotal = parseInt(TextRow.total);

        //기부포인트 발행금액(횟수)
        let DNTIssueQuery =
          `SELECT CAST(count(*) AS signed integer) AS count, CAST(IFNULL(SUM(value), 0) AS signed integer) AS total ` +
          `FROM Ledger  ` +
          `WHERE transactionType = 'Charge' AND currency = 'DNT' ` +
          `AND createdAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' `;
        var [[TextRow]] = await connection.query(DNTIssueQuery, []);
        const DNTIssueCount = parseInt(TextRow.count);
        const DNTIssueTotal = parseInt(TextRow.total);

        //기부포인트 참여금액(인원)
        let DNTUseQuery =
          `SELECT CAST(count(distinct(trustline))/2 AS signed integer) AS count, CAST(IFNULL(SUM(value)/2, 0) AS signed integer) AS total ` +
          `FROM Ledger  ` +
          `WHERE transactionType = 'Donation' AND currency = 'DNT' ` +
          `AND createdAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' `;
        var [[TextRow]] = await connection.query(DNTUseQuery, []);
        const DNTUseCount = parseInt(TextRow.count);
        const DNTUseTotal = parseInt(TextRow.total);

        //충전인원
        let ChargeRequestUserQuery =
          `SELECT count(distinct(user)) AS total ` +
          `FROM ChargeRequest ` +
          `WHERE commonStatus = 'C' ` +
          `AND createdAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' `;
        var [[TextRow]] = await connection.query(ChargeRequestUserQuery, []);
        const ChargeRequestUserCount = parseInt(TextRow.total);

        //CMS 충전금액(횟수)
        let ChargeRequestCMSQuery =
          `SELECT count(*) AS count, IFNULL(SUM(amount), 0) AS total ` +
          `FROM ChargeRequest ` +
          `WHERE commonStatus = 'C' AND  pay_method = 'cms' ` +
          `AND createdAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999'`;
        var [[TextRow]] = await connection.query(ChargeRequestCMSQuery, []);
        const ChargeRequestCMSCount = parseInt(TextRow.count);
        const ChargeRequestCMSTotal = parseInt(TextRow.total);

        //일반 충전금액(횟수)
        let ChargeRequestNomalQuery =
          `SELECT count(*) AS count, IFNULL(SUM(amount), 0) AS total ` +
          `FROM ChargeRequest ` +
          `WHERE commonStatus = 'C' AND  pay_method <> 'cms' ` +
          `AND createdAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' `;
        var [[TextRow]] = await connection.query(ChargeRequestNomalQuery, []);
        const ChargeRequestNomalCount = parseInt(TextRow.count);
        const ChargeRequestNomalTotal = parseInt(TextRow.total);

        //결제금액(횟수)
        let PaymentQuery =
          `SELECT count(*) AS count, IFNULL(SUM(value), 0) AS total ` +
          `FROM StoreOrder ` +
          `WHERE commonStatus = 'C' ` +
          `AND updatedAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' `;
        var [[TextRow]] = await connection.query(PaymentQuery, []);
        const PaymentCount = parseInt(TextRow.count);
        const PaymentTotal = parseInt(TextRow.total);

        //송금금액(횟수)
        let RemittanceQuery =
          `SELECT CAST(count(*)/2 AS signed integer) AS count, CAST(IFNULL(SUM(value)/2, 0) AS signed integer) AS total ` +
          `FROM Ledger ` +
          `WHERE transactionType = 'Remittance' ` +
          `AND createdAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' `;
        var [[TextRow]] = await connection.query(RemittanceQuery, []);
        const RemittanceCount = parseInt(TextRow.count);
        const RemittanceTotal = parseInt(TextRow.total);

        //환전 금액(횟수)
        let ExchangeRequestQuery =
          `SELECT count(*) AS count, IFNULL(SUM(ExchangeRequest.amount), 0) AS total ` +
          `FROM ExchangeRequest LEFT OUTER JOIN User ON (ExchangeRequest.user = User.id) ` +
          `WHERE User.role = 'Store' ` +
          `AND ExchangeRequest.commonStatus = 'C' ` +
          `AND ExchangeRequest.currency = 'DRM' ` +
          `AND ExchangeRequest.createdAt between '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999'`;
        var [[TextRow]] = await connection.query(ExchangeRequestQuery, []);
        const ExchangeRequestCount = parseInt(TextRow.count);
        const ExchangeRequestTotal = parseInt(TextRow.total);

        //소비자 충전 목록
        let UsersChargeQuery =
          `SELECT User.wallet AS wallet, User.userId AS userId, User.name AS name, ` +
          `SUM(Ledger.transactionType='Charge') AS ChargeCount, ` +
          `SUM(IF(Ledger.transactionType='Charge', value, 0)) AS ChargeTotal ` +
          `FROM User LEFT OUTER JOIN Ledger ON (User.wallet = Ledger.wallet) ` +
          `WHERE User.role='user' AND Ledger.currency='DRM' ` +
          `AND Ledger.createdAt BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' ` +
          `GROUP BY User.userId ` +
          `ORDER BY ChargeTotal DESC ` +
          `Limit 10 `;
        var [rows] = await connection.query(UsersChargeQuery, []);
        const usersCharge = rows;

        //소비자 상점결제 목록
        let UsersStoreOrderQuery =
          `SELECT User.wallet AS wallet, User.userId AS userId, User.name AS name, ` +
          `SUM(Ledger.transactionType='StoreOrder' AND Ledger.wallet=Ledger.accountWallet) AS StoreOrderCount, ` +
          `SUM(IF(Ledger.transactionType='StoreOrder' AND Ledger.wallet=Ledger.accountWallet, value, 0)) - SUM(if(Ledger.transactionType='StoreOrder' AND Ledger.wallet=Ledger.destinationWallet, value, 0)) AS StoreOrderTotal ` +
          `FROM User LEFT OUTER JOIN Ledger ON (User.wallet = Ledger.wallet) ` +
          `WHERE User.role='user' AND Ledger.currency='DRM' ` +
          `AND Ledger.createdAt BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' ` +
          `GROUP BY User.userId ` +
          `ORDER BY StoreOrderTotal DESC ` +
          `Limit 10 `;
        var [rows] = await connection.query(UsersStoreOrderQuery, []);
        const usersStoreOrder = rows;

        //소비자 상점환불 목록
        let UsersStoreReturnQuery =
          `SELECT User.wallet AS wallet, User.userId AS userId, User.name AS name, ` +
          `SUM(Ledger.transactionType='StoreOrder' AND Ledger.wallet=Ledger.destinationWallet) AS StoreReturnCount, ` +
          `SUM(if(Ledger.transactionType='StoreOrder' AND Ledger.wallet=Ledger.destinationWallet, value, 0)) AS StoreReturnTotal ` +
          `FROM User LEFT OUTER JOIN Ledger ON (User.wallet = Ledger.wallet) ` +
          `WHERE User.role='user' AND Ledger.currency='DRM' ` +
          `AND Ledger.createdAt BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' ` +
          `GROUP BY User.userId ` +
          `ORDER BY StoreReturnTotal DESC ` +
          `Limit 10 `;
        var [rows] = await connection.query(UsersStoreReturnQuery, []);
        const usersStoreReturn = rows;

        //소비자 송금 목록
        let UsersRemittanceQuery =
          `SELECT User.wallet AS wallet, User.userId AS userId, User.name AS name, ` +
          `SUM(Ledger.transactionType='Remittance') AS RemittanceCount, ` +
          `SUM(if(Ledger.transactionType='Remittance', value, 0)) AS RemittanceTotal ` +
          `FROM User LEFT OUTER JOIN Ledger ON (User.wallet = Ledger.wallet) ` +
          `WHERE User.role='user' AND Ledger.currency='DRM' ` +
          `AND Ledger.createdAt BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' ` +
          `GROUP BY User.userId ` +
          `ORDER BY RemittanceTotal DESC ` +
          `Limit 10 `;
        var [rows] = await connection.query(UsersRemittanceQuery, []);
        const usersRemittance = rows;

        //소비자 기부 목록
        let UsersDonationQuery =
          `SELECT User.wallet AS wallet, User.userId AS userId, User.name AS name, ` +
          `SUM(Ledger.transactionType='Donation') AS DonationCount, ` +
          `SUM(if(Ledger.transactionType='Donation', value, 0)) AS DonationTotal ` +
          `FROM User LEFT OUTER JOIN Ledger ON (User.wallet = Ledger.wallet) ` +
          `WHERE User.role='user' AND Ledger.currency='DRM' ` +
          `AND Ledger.createdAt BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' ` +
          `GROUP BY User.userId ` +
          `ORDER BY DonationTotal DESC ` +
          `Limit 10 `;
        var [rows] = await connection.query(UsersDonationQuery, []);
        const usersDonation = rows;

        //가맹점 목록
        let StoresQuery =
          `SELECT StoreOrder.storeUserWallet AS wallet, StoreOrder.storeUserWallet, Store.*, COUNT(value) AS count, SUM(value) AS total  ` +
          `FROM Store LEFT OUTER JOIN StoreOrder ON (Store.id = StoreOrder.store) ` +
          `WHERE StoreOrder.commonStatus = 'C' AND StoreOrder.currency = 'DRM' ` +
          `AND StoreOrder.createdAt BETWEEN '${startDate} 00:00:00.000' AND '${endDate} 23:59:59.999' ` +
          `GROUP BY store, StoreOrder.storeUserWallet ` +
          `ORDER BY total DESC `;
        var [rows] = await connection.query(StoresQuery, []);
        const stores = rows;

        console.log({
          DNTTotal,
          DNTIssueCount,
          DNTIssueTotal,
          DNTUseCount,
          DNTUseTotal,
          ChargeRequestUserCount,
          ChargeRequestCMSCount,
          ChargeRequestCMSTotal,
          ChargeRequestNomalCount,
          ChargeRequestNomalTotal,
          PaymentCount,
          PaymentTotal,
          RemittanceCount,
          RemittanceTotal,
          ExchangeRequestCount,
          ExchangeRequestTotal,
          usersCharge: usersCharge,
          usersStoreOrder: usersStoreOrder,
          usersStoreReturn: usersStoreReturn,
          usersRemittance: usersRemittance,
          usersDonation: usersDonation,
          stores: stores
        });

        return {
          DNTTotal,
          DNTIssueCount,
          DNTIssueTotal,
          DNTUseCount,
          DNTUseTotal,
          ChargeRequestUserCount,
          ChargeRequestCMSCount,
          ChargeRequestCMSTotal,
          ChargeRequestNomalCount,
          ChargeRequestNomalTotal,
          PaymentCount,
          PaymentTotal,
          RemittanceCount,
          RemittanceTotal,
          ExchangeRequestCount,
          ExchangeRequestTotal,
          usersCharge: usersCharge,
          usersStoreOrder: usersStoreOrder,
          usersStoreReturn: usersStoreReturn,
          usersRemittance: usersRemittance,
          usersDonation: usersDonation,
          stores: stores
        };
      } finally {
        connection.release();
      }
      /* 소비자 통계 끝 */
    }
  }
};
