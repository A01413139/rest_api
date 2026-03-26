const home = (req, res) => {
  res.json({ mensaje: "API funcionando" });
};

const marco = (req, res) => {
  res.json({ mensaje: "hola marco" });
};

const ping = (req, res) => {
  res.json({ mensaje: "pong" });
};

module.exports = { home, marco, ping };