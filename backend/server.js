const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// =========================================================
// MYSQL CONNECTION
// =========================================================

// Load Aiven CA certificate
const sslCa = process.env.DB_SSL_CA_CONTENT
  ? process.env.DB_SSL_CA_CONTENT.replace(/\\n/g, "\n")
  : fs.readFileSync(
      path.resolve(__dirname, process.env.DB_SSL_CA)
    );

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: sslCa,
    rejectUnauthorized: true
  }
});


// =========================================================
// TEST CONNECTION
// =========================================================

app.get("/api/test", async (req, res) => {

  try {

    await pool.query("SELECT 1");

    res.json({
      message: "Backend and MySQL are connected."
    });

  } catch (error) {

    console.error("DATABASE ERROR:", error);

    res.status(500).json({
      message: "Database connection failed.",
      error: error.message
    });

  }

});


// =========================================================
// REGISTER
// =========================================================

app.post("/api/register", async (req, res) => {

  const { name, password } = req.body;

  if (!name || !password) {

    return res.status(400).json({
      message: "Name and password are required."
    });

  }

  try {

    await pool.query(
      "INSERT INTO users (name, password) VALUES (?, ?)",
      [name, password]
    );

    res.status(201).json({
      message: "Registration successful!"
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error."
    });

  }

});


// =========================================================
// LOGIN
// =========================================================

app.post("/api/login", async (req, res) => {

  const { name, password } = req.body;

  if (!name || !password) {

    return res.status(400).json({
      message: "Name and password are required."
    });

  }

  try {

    const [users] = await pool.query(
      `
      SELECT id, name, password
      FROM users
      WHERE name = ? AND password = ?
      LIMIT 1
      `,
      [name, password]
    );

    if (users.length === 0) {

      return res.status(401).json({
        message: "Incorrect name or password."
      });

    }

    res.json({

      message: "Login successful!",

      user: {
        id: users[0].id,
        name: users[0].name
      }

    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error."
    });

  }

});


// =========================================================
// START SERVER
// =========================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Backend running at http://localhost:${PORT}`
  );

});