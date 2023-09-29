const { Moto, Color } = require("../db");

async function editMoto(req, res) {
  try {
    const motoId = req.params.id;
    const { precio, imageUrl, colorDisponible } = req.body;

    const moto = await Moto.findByPk(motoId);

    if (!moto) {
      return res.status(404).json({ error: "Moto no encontrada" });
    }

    // Actualizar información de la moto
    let colors = [];
    if (Array.isArray(colorDisponible) && colorDisponible.length > 0) {
      for (colorName of colorDisponible) {
        const [colorBd, colorCreado] = await Color.findOrCreate({
          where: { name: colorName },
        });
        colors.push(colorBd.id);
      }
    }
    await moto.setColors(colors);
    await moto.update({ precio, imageUrl });

    const motoBd = await Moto.findByPk(motoId, {
      include: [{ model: Color, attributes: ["name"] }],
    });
    res.json(motoBd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo actualizar la moto" });
  }
}

module.exports = editMoto;