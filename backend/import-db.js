const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

async function importDatabase() {
  let connection;

  try {
    console.log("Connecting to Aiven MySQL...");

    const caPath = path.resolve(__dirname, process.env.DB_SSL_CA);

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      ssl: {
        ca: fs.readFileSync(caPath),
        rejectUnauthorized: true
      }
    });

    console.log("Connected to Aiven MySQL.");

    console.log("Creating users table...");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB
      DEFAULT CHARSET=utf8mb4
      COLLATE=utf8mb4_0900_ai_ci
    `);

    console.log("Users table created.");

    console.log("Importing existing users...");

    await connection.query(`
      INSERT INTO users (id, name, password)
      VALUES
        (1, 'Roselyn Lagnason', 'D@rlingx15'),
        (2, 'Roselyn Lagnason', 'Darlingx15#'),
        (3, 'Roselyn Lagnason', 'Darlingx15#'),
        (4, 'Roselyn Lagnason', 'Darlingx15#'),
        (5, 'Roselyn Lagnason', 'Darlingx15#')
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        password = VALUES(password)
    `);

    console.log("Users imported.");

    await connection.query(`
      ALTER TABLE users AUTO_INCREMENT = 6
    `);

    console.log("=================================");
    console.log("DATABASE IMPORT SUCCESSFUL!");
    console.log("=================================");

  } catch (error) {

    console.error("DATABASE IMPORT ERROR:");
    console.error(error.message);

  } finally {

    if (connection) {
      await connection.end();
    }

  }
}

importDatabase();