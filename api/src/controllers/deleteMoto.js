const { Moto } = require("../db");

//Eliminar moto por id

async function deleteMoto(req, res) {
  try {
    const motoId = req.params.id;

    const moto = await Moto.findByPk(motoId);

    if (!moto) {
      throw res.status(404).json({ error: "La moto no existe" });
    }
    await moto.destroy();

    res.json({ message: "Moto eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
}

module.exports = deleteMoto;
