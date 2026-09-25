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
// ROOT
// =========================================================

app.get("/", (req, res) => {
  res.json({
    message: "Student Cash Assistance Backend is running."
  });
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
// SUBMIT STUDENT APPLICATION
// =========================================================

app.post("/api/applications", async (req, res) => {
  const {
    userId,
    studentId,
    course,
    yearLevel,
    school,
    contactNumber,
    address,
    allowance,
    expenses,
    householdIncome,
    reason
  } = req.body;

  // Check required fields
  if (
    !userId ||
    !studentId ||
    !course ||
    !yearLevel ||
    !school ||
    !contactNumber ||
    !address ||
    !allowance ||
    !expenses ||
    !reason
  ) {
    return res.status(400).json({
      message: "Please complete all required fields."
    });
  }

  try {

    // Check that the user exists
    const [users] = await pool.query(
      "SELECT id FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (users.length === 0) {
      return res.status(400).json({
        message: "User account was not found."
      });
    }

    // Save application
    const [result] = await pool.query(
      `
      INSERT INTO applications
      (
        user_id,
        student_id,
        course,
        year_level,
        school,
        contact_number,
        address,
        allowance,
        expenses,
        household_income,
        reason
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        studentId,
        course,
        yearLevel,
        school,
        contactNumber,
        address,
        allowance,
        expenses,
        householdIncome || null,
        reason
      ]
    );

    res.status(201).json({
      message: "Application submitted successfully.",
      applicationId: result.insertId
    });

  } catch (error) {
    console.error("APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Failed to save application."
    });
  }
});


// =========================================================
// ADMIN - GET REGISTERED USERS
// =========================================================

app.get("/api/admin/users", async (req, res) => {
  try {
    const [users] = await pool.query(`
      SELECT
        id,
        name,
        password
      FROM users
      ORDER BY id DESC
    `);

    res.json(users);

  } catch (error) {
    console.error("ADMIN USERS ERROR:", error);

    res.status(500).json({
      message: "Failed to retrieve registered users."
    });
  }
});


// =========================================================
// ADMIN - GET ALL APPLICATIONS
// =========================================================

app.get("/api/admin/applications", async (req, res) => {
  try {

    const [applications] = await pool.query(
      `
      SELECT
        a.id,
        a.user_id,
        u.name,
        a.student_id,
        a.course,
        a.year_level,
        a.school,
        a.contact_number,
        a.address,
        a.allowance,
        a.expenses,
        a.household_income,
        a.reason,
        a.created_at

      FROM applications a

      INNER JOIN users u
        ON a.user_id = u.id

      ORDER BY a.id DESC
      `
    );

    res.json(applications);

  } catch (error) {
    console.error("ADMIN APPLICATIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to retrieve applications."
    });
  }
});


// =========================================================
// ADMIN - GET SINGLE APPLICATION
// =========================================================

app.get("/api/admin/applications/:id", async (req, res) => {
  const { id } = req.params;

  try {

    const [applications] = await pool.query(
      `
      SELECT
        a.id,
        a.user_id,
        u.name,
        a.student_id,
        a.course,
        a.year_level,
        a.school,
        a.contact_number,
        a.address,
        a.allowance,
        a.expenses,
        a.household_income,
        a.reason,
        a.created_at

      FROM applications a

      INNER JOIN users u
        ON a.user_id = u.id

      WHERE a.id = ?

      LIMIT 1
      `,
      [id]
    );

    if (applications.length === 0) {
      return res.status(404).json({
        message: "Application not found."
      });
    }

    res.json(applications[0]);

  } catch (error) {
    console.error("ADMIN APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Failed to retrieve application."
    });
  }
});


// =========================================================
// ADMIN LOGIN
// =========================================================

app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: "Admin password is required."
    });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({
      message: "Incorrect admin password."
    });
  }

  res.json({
    message: "Admin login successful."
  });
});


// =========================================================
// ADMIN - DELETE REGISTERED USER
// =========================================================

app.delete("/api/admin/users/:id", async (req, res) => {
  const userId = Number(req.params.id);

  if (!Number.isInteger(userId)) {
    return res.status(400).json({
      message: "Invalid user ID."
    });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Delete applications first
    await connection.query(
      `
      DELETE FROM applications
      WHERE user_id = ?
      `,
      [userId]
    );

    // Delete user account
    const [result] = await connection.query(
      `
      DELETE FROM users
      WHERE id = ?
      `,
      [userId]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();

      return res.status(404).json({
        message: "User not found."
      });
    }

    await connection.commit();

    res.json({
      message: "User deleted successfully."
    });

  } catch (error) {
    await connection.rollback();

    console.error("DELETE USER ERROR:", error);

    res.status(500).json({
      message: "Failed to delete user.",
      error: error.message
    });

  } finally {
    connection.release();
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