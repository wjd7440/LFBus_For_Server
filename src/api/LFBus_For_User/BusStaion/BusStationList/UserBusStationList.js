import { prisma } from "../../../../../generated/prisma-client";
import mysql from "mysql2/promise";
import { dbConfig } from "../../../../../config/db.config";
const pool = mysql.createPool(dbConfig);

export default {
  Query: {
    UserBusStationList: async (_, args) => {
      const { latitude, longitude } = args;

      const busStations = await prisma.busStations();

      const count = await prisma.busStationsConnection().aggregate().count();

      const connection = await pool.getConnection(async (conn) => conn);
      const [[DISTANCE]] = await connection.query(
        `select distance_between(GPS_LATI, GPS_LONG, ${latitude}, ${longitude})`,
        []
      );
      connection.release();
      console.log(DISTANCE);
      return { busStations, count };
    },
  },
};
