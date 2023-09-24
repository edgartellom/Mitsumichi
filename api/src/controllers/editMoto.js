const { Moto } = require("../db");

// Controlador para actualizar una moto por su ID
async function editMoto(req, res) {
  try {
    const motoId = req.params.id;
    const { precio, imageUrl } = req.body;

    const moto = await Moto.findByPk(motoId);

    if (!moto) {
      throw res.status(404).json({ error: "Moto no encontrada" });
    }

    // Actualizar información de la moto

    await moto.update({ precio, imageUrl });

    res.json(moto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar la moto" });
  }
}

module.exports = editMoto;
