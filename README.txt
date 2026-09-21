PASSCHECKER - NAME + PASSWORD VERSION

Database table:
id | name | password

Register:
Name + Password + Confirm Password

Login:
Password only

The password is intentionally stored as plaintext for this local/demo project.
Do NOT use plaintext passwords for a real application.

Backend setup:
1. Run backend/database.sql in MySQL/phpMyAdmin.
2. Copy backend/.env.example to backend/.env and enter your MySQL password.
3. In backend:
   npm init -y
   npm install express cors mysql2 dotenv
   node server.js

Frontend:
Copy the frontend/src files into your React/Vite project's src folder, then run:
npm install
npm run dev
