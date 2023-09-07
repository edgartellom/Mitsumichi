const { Moto } = require("../db");

//Eliminar moto por id

async function disableMoto(req, res) {
    try {
      const motoId = req.params.id;
  
      const moto = await Moto.findByPk(motoId);
  
      if (!moto) {
        throw res.status(404).json({ error: "La moto no existe" });
      }
  
      // Realiza el borrado lógico
      moto.deleted = true;
      moto.deletedAt = new Date(); // Opcional: registra la fecha y hora de eliminación
  
      await moto.save();
  
      res.json({ message: "Moto marcada como eliminada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error" });
    }
  }
  

module.exports = disableMoto;
