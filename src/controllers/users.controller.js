const pool = require("../db");
const CryptoJS = require("crypto-js");

const getUsers = async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
};

const createUser = async (req, res) => {
  const { username, password } = req.body;

  const hash = CryptoJS.SHA256(password).toString();

  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1,$2) RETURNING *",
    [username, hash]
  );

  res.json(result.rows[0]);
};

module.exports = { getUsers, createUser };