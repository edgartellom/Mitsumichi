const { Moto, MotoColor } = require("../db"); // Ajusta la ruta según tu estructura

const editStockMoto = async (req, res) => {
  const { motoId, colorId, newStock } = req.body;

  try {
    // Actualiza el stock en la relación MotoColor
    await MotoColor.update(
      { stock: newStock },
      {
        where: {
          motoId,
          colorId,
        },
      }
    );

    // Obtiene el id de la moto para actualizar su stock
    const moto = await Moto.findOne({ where: { id: motoId } });

    if (moto) {
      // Calcula el nuevo stock de la moto sumando el stock de cada color
      const totalStock = await MotoColor.sum("stock", {
        where: { motoId },
      });

      // Actualiza el stock de la moto
      await moto.update({ stock: totalStock });

      res.status(200).json({ message: "Stock actualizado exitosamente." });
    } else {
      res.status(404).json({ message: "Moto no encontrada." });
    }
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al actualizar el stock." });
  }
};

module.exports = editStockMoto;
