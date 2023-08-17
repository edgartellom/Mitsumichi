const { Op } = require("sequelize");
const { MotoModel, Brand } = require("../db");
async function getAllMotoModels(req, res) {
  // Obtener los modelos de motos de la base de datos después de haberlos creado
  try {
    const { brand } = req.query;
    let filterOptions = {};
    if (brand) {
      // Si brand está presente en la solicitud
      // Realizamos la consulta para obtener los modelos de motos filtrados por la marca
      const brandFound = await Brand.findOne({
        where: { name: { [Op.iLike]: brand } },
      });
      filterOptions = { ...filterOptions, brandId: brandFound.id };
    }

    const dbMotoModels = await MotoModel.findAll({
      where: filterOptions,
      include: {
        model: Brand,
        attributes: ["name"],
      },
    });
    // Responder con la lista completa de modelos de motos
    res.status(200).json(dbMotoModels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los modelos de motos" });
  }
}

module.exports = getAllMotoModels;
