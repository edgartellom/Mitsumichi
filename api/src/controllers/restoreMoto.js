const { Moto } = require("../db");

async function restoreMoto(req, res) {
  try {
    const motoId = req.params.id;

    const moto = await Moto.findByPk(motoId);

    if (!moto) {
      return res.status(404).json({ error: "La moto no existe" });
    }

    // Actualizar la columna 'deleted' a 'false'
    moto.deleted = false;
    await moto.save();

    res.json({ message: "Moto restaurada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
}

module.exports = restoreMoto;