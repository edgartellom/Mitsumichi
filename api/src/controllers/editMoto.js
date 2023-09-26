const { Moto, Color } = require("../db");

async function editMoto(req, res) {
  try {
    const motoId = req.params.id;
    const { precio, imageUrl, colorDisponible } = req.body;
    console.log(req.body);
    const moto = await Moto.findByPk(motoId, {
      include: [Color], // Incluye la relación con los colores asociados
    });

    if (!moto) {
      return res.status(404).json({ error: "Moto no encontrada" });
    }

    // Actualizar información de la moto (precio e imageUrl)
    await moto.update({ precio, imageUrl });

    // Función para agregar un color por nombre y obtener su ID
    async function addColorByName(colorName) {
      let color = await Color.findOne({ where: { name: colorName } });
      if (!color) {
        color = await Color.create({ name: colorName });
      }
      return color.id;
    }

    // Si existen colores disponibles, asócialos a la moto
    if (colorDisponible && colorDisponible.length > 0) {
      for (const colorName of colorDisponible) {
        const colorId = await addColorByName(colorName);
        await moto.addColor(colorId);
      }
    }

    // Devuelve la moto actualizada, incluyendo los colores asociados
    const updatedMoto = await Moto.findByPk(motoId, {
      include: [Color],
    });

    res.json(updatedMoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar la moto" });
  }
}

module.exports = editMoto;
