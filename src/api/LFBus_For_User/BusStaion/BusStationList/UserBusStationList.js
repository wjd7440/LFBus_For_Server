import { prisma } from "../../../../../generated/prisma-client";
import mysql from "mysql2/promise";
import { dbConfig } from "../../../../../config/db.config";
const pool = mysql.createPool(dbConfig);

export default {
  Query: {
    UserBusStationList: async (_, args) => {
      const { latitude, longitude } = args;

      const connection = await pool.getConnection(async (conn) => conn);
      const objects = await connection.query(
        `SELECT distance_between(GPS_LATI, GPS_LONG, ${latitude}, ${longitude}) AS DISTANCE FROM BusStation`
      );
      connection.release();

      let busStations = [];
      objects.map(obejct, (index) => {
        busStations.push(obejct.TextRow);
      });

      const count = busStations.length;

      return { busStations, count };
    },
  },
};
