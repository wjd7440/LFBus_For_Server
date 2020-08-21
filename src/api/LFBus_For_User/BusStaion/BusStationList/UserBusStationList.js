import { prisma } from "../../../../../generated/prisma-client";
import mysql from "mysql2/promise";
import { dbConfig } from "../../../../../config/db.config";
const pool = mysql.createPool(dbConfig);

export default {
  Query: {
    UserBusStationList: async (_, args) => {
      const { latitude, longitude } = args;

      let busStations = [];
      const connection = await pool.getConnection(async (conn) => conn);
      const objects = await connection.query(
        `SELECT BUS_NODE_ID, BUSSTOP_NM, distance_between(GPS_LATI, GPS_LONG, ${latitude}, ${longitude}) AS DISTANCE FROM BusStation WHERE distance_between(GPS_LATI, GPS_LONG, ${latitude}, ${longitude}) <= 0.5 `,
        function(error, results, fields) {
          if (error) throw error;
          console.log(results[0]);
          // results.map((obejct, index) => {
          //   busStations.push(obejct.TextRow);
          // });
        }
      );
      connection.release();

      console.log(busStations);

      const count = busStations.length;

      return { busStations, count };
    },
  },
};
