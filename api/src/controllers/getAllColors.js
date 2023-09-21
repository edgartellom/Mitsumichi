const { Color } = require("../db");
async function getAllColors(req, res) {
  // Obtener las colores de motos de la base de datos después de haberlos creado
  try {
    const dbColors = await Color.findAll();
    // Responder con la lista completa de colores de motos
    res.status(200).json(dbColors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
}

module.exports = getAllColors;
