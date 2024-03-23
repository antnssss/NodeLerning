const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3001;

const db = new sqlite3.Database("./test.db", (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to the SQLite database.");
});

const createUserTableQuery =
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, password TEXT)";
db.run(createUserTableQuery, (err) => {
  if (err) return console.error("Error creating users table:", err.message);
  console.log("Users table created or already exists.");
});

const createItemsTableQuery =
  "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, name TEXT)";
db.run(createItemsTableQuery, (err) => {
  if (err) return console.error("Error creating items table:", err.message);
  console.log("Items table created or already exists.");
});

const insertUserQuery =
  "INSERT INTO users (first_name, last_name, password) VALUES (?, ?, ?)";
db.run(insertUserQuery, ["anton", "andrey", "anton_user", "123"], (err) => {
  if (err) return console.error("Error inserting user:", err.message);
  console.log("User inserted successfully.");
});

app.get("/items", (req, res) => {
  db.all("SELECT * FROM items", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
