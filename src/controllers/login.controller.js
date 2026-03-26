const pool = require("../db");
const CryptoJS = require("crypto-js");

const login = async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );

  if (result.rows.length === 0) {
    return res.json({ mensaje: "no existe" });
  }

  const user = result.rows[0];
  const hash = CryptoJS.SHA256(password).toString();

  if (user.password !== hash) {
    return res.json({ mensaje: "password incorrecto" });
  }

  res.json({ mensaje: "login ok" });
};

module.exports = { login };