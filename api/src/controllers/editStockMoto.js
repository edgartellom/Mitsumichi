// const { Moto, MotoColor } = require("../db");

// const editStockMoto = async (req, res) => {
//   const stockUpdates = req.body; // El body de la solicitud ahora contiene un array
//   try {
//     // bucle para actualizar el stock de las motos
//     for (const update of stockUpdates) {
//       const { motoId, colorId, newStock } = update;

//       await MotoColor.update(
//         { stock: newStock },
//         {
//           where: {
//             motoId,
//             colorId,
//           },
//         }
//       );

//       const moto = await Moto.findOne({ where: { id: motoId } });

//       if (moto) {
//         const totalStock = await MotoColor.sum("stock", {
//           where: { motoId },
//         });

//         await moto.update({ stock: totalStock });
//       } else {
//         res.status(404).json({ message: "Moto no encontrada." });
//         return; // Sale del bucle si la moto no se encuentra
//       }
//     }

//     res.status(200).json({ message: "Stock actualizado exitosamente." });
//   } catch (error) {
//     console.error("Error al actualizar el stock:", error);
//     res
//       .status(500)
//       .json({ message: "Ocurrió un error al actualizar el stock." });
//   }
// };

// module.exports = editStockMoto;


const { Moto } = require("../db");

const editStockMoto = async (req, res) => {
  const stockUpdates = req.body;
  try {
    for (const update of stockUpdates) {
      const { motoId, newStock } = update;

      // Actualiza el stock general de la moto
      await Moto.update(
        { stock: newStock },
        {
          where: {
            id: motoId,
          },
        }
      );
    }

    res.status(200).json({ message: "Stock actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar el stock:", error);
    res
      .status(500)
      .json({ message: "Ocurrió un error al actualizar el stock." });
  }
};

module.exports = editStockMoto;
