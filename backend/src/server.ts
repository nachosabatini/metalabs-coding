import express from "express";
import { Pool } from "pg";
import sequelize from "./config/database";
import notesRouter from "./routes/notes";
import bodyParser from "body-parser";
import authRouter from "./routes/auth";

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
const port = 4000;

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER || "admin",
  host: process.env.DB_HOST || "db",
  database: process.env.DB_NAME || "metalabs-coding-challenge",
  password: process.env.DB_PASSWORD || "admin",
  port: Number(process.env.DB_PORT) || 5432,
});

//Routes
app.use("/api", notesRouter);
app.use("/auth", authRouter);

app.get("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT $1::text as message", [
      "Hello, World!",
    ]);
    const message = result.rows[0].message;
    client.release();

    res.send(message);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Synchronize the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error: Error) => {
    console.error("Error synchronizing database:", error);
  });
