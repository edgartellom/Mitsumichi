const { Moto } = require("../db");

async function marcarDesmarcarMotos(req, res) {
  try {
    const motosToUpdate = req.body; // El cuerpo de la solicitud contiene el arreglo de motos
    console.log(motosToUpdate);

    for (const motoUpdate of motosToUpdate) {
      const { id, deleted } = motoUpdate;

      if (!id) {
        throw res.status(400).json({
          error: "Se requiere un ID válido en el cuerpo de la solicitud",
        });
      }

      const moto = await Moto.findByPk(id);

      if (!moto) {
        throw res.status(404).json({ error: "La moto no existe" });
      }

      // Actualizar el estado 'deleted' de la moto según el valor en el cuerpo de la solicitud
      moto.deleted = deleted;
      moto.deletedAt = new Date();
      await moto.save();
    }

    res.json({ message: "Motos marcadas/desmarcadas exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
}

module.exports = marcarDesmarcarMotos;
