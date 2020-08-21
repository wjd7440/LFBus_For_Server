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
        `SELECT BUS_NODE_ID, BUSSTOP_NM, distance_between(GPS_LATI, GPS_LONG, ${latitude}, ${longitude}) AS DISTANCE FROM BusStation WHERE distance_between(GPS_LATI, GPS_LONG, ${latitude}, ${longitude}) <= 0.5 `
        // (error, results, fields) => {
        //   if (error) throw error;
        //   // console.log(results[0].BUS_NODE_ID);
        //   results.map((obejct, index) => {
        //     const busStation = {
        //       BUS_NODE_ID: obejct.BUS_NODE_ID,
        //       BUSSTOP_NM: obejct.BUSSTOP_NM,
        //       DISTANCE: obejct.DISTANCE,
        //     };
        //     busStations.push(busStation);
        //   });
        // }
      );
      connection.release();

      console.log(objects);

      const count = busStations.length;

      return { busStations, count };
    },
  },
};
