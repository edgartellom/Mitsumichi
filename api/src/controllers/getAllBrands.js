const { Brand } = require("../db");
async function getAllBrands(req, res) {
  // Obtener las marcas de motos de la base de datos después de haberlos creado
  try {
    const dbBrands = await Brand.findAll();
    // Responder con la lista completa de marcas de motos
    res.status(200).json(dbBrands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
}

module.exports = getAllBrands;
