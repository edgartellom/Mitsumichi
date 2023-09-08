const { Moto } = require("../db");

async function marcarDesmarcarMoto(req, res) {
  try {
    const { id, deleted } = req.body;
    // const { deleted } = req.body;

    if (!id) {
      throw res.status(400).json({ error: "Se requiere un ID válido en el cuerpo de la solicitud" });
    }

    const moto = await Moto.findByPk(id);

    if (!moto) {
      throw res.status(404).json({ error: "La moto no existe" });
    }

    // Actualizar el estado 'deleted' de la moto según el valor en el cuerpo de la solicitud
    moto.deleted = deleted;
    moto.deletedAt = new Date();
    await moto.save();

    res.json({ message: `Moto ${deleted ? "marcada" : "desmarcada"} como eliminada` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
}

module.exports = marcarDesmarcarMoto
