const { Moto } = require("../db");

async function editMoto(req, res) {
  console.log(req.body);
  try {
    const motoId = req.params.id;
    const { precio, imageUrl } = req.body;

    const moto = await Moto.findByPk(motoId);

    if (!moto) {
      return res.status(404).json({ error: "Moto no encontrada" });
    }

    await moto.update({ precio, imageUrl });

    res.json({ message: "Moto actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar la moto" });
  }
}

module.exports = editMoto;
