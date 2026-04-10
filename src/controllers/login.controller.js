const CryptoJS = require("crypto-js");
const pool = require("../db");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ mensaje: "Faltan datos" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuario no existe" });
    }

    const user = result.rows[0];
    const hash = CryptoJS.SHA256(password).toString();

    if (user.password !== password && user.password !== hash) {
      return res.status(401).json({ error: "Password incorrecto" });
    }

    res.json({
      mensaje: "login ok",
      token: hash,
      user: {
        id: user.user_id,
        username: user.username,
        role: user.role,
        nivel: user.nivel
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login };