const { Tipo } = require("../db");
async function getAllTipos(req, res) {
  // Obtener las tipos de motos de la base de datos después de haberlos creado
  try {
    const dbTipos = await Tipo.findAll();
    // Responder con la lista completa de tipos de motos
    res.status(200).json(dbTipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los tipos" });
  }
}

module.exports = getAllTipos;
