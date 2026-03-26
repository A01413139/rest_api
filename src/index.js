const app = require("./app");
const pool = require("./db");
require("dotenv").config();

app.listen(process.env.PORT, async () => {
  console.log("Servidor en puerto " + process.env.PORT);

  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Conectado");
    console.log(result.rows);
  } catch (error) {
    console.log("Error ");
    console.log(error.message);
  }
});