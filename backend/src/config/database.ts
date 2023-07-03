import { Sequelize } from "sequelize";

require("dotenv").config();

const dbHost = process.env.DB_HOST || "db";
const dbPort = Number(process.env.DB_PORT) || 5432;
const dbName = process.env.DB_NAME || "metalabs-coding-challenge";
const dbUser = process.env.DB_USER || "admin";
const dbPassword = process.env.DB_PASSWORD || "admin";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
});

export default sequelize;
