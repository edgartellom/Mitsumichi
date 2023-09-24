const fs = require("fs");
const { Moto, Brand, Tipo, Color, MotoColor } = require("../db");
const path = require("path");
const { Op } = require("sequelize");
const filePath = path.join(__dirname, "../../", "motosapi.json");

// Función para cargar la información del archivo JSON en la base de datos
async function loadApiDataInDb() {
  try {
    const apiData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(apiData);
    let createdCount = 0;
    let foundCount = 0;

    for (const motoData of data) {
      const {
        id,
        marca,
        modelo,
        tipo,
        precio,
        year,
        imageUrl,
        combustible,
        colorDisponible,
        fichaTecnica,
      } = motoData;

      // Cargar Brand (marca) si no existe
      const [marcaBd, marcaCreada] = await Brand.findOrCreate({
        where: { name: marca },
      });

      const [tipoBd, tipoCreado] = await Tipo.findOrCreate({
        where: { name: tipo },
      });

      // Cargar Moto si no existe
      const [newMoto, motoCreated] = await Moto.findOrCreate({
        where: { id },
        defaults: {
          brandId: marcaBd.id,
          tipoId: tipoBd.id,
          motoModel: modelo,
          precio,
          year,
          imageUrl,
          combustible,
          fichaTecnica,
        },
      });

      // Asociar los colores a la moto
      for (const colorName of colorDisponible) {
        try {
          const [colorBd, colorCreado] = await Color.findOrCreate({
            where: { name: colorName },
          });

          // Asocia el color a la moto
          await newMoto.addColor(colorBd);

          // Obtiene la relación entre la moto y el color (MotoColor)
          const motoColor = await MotoColor.findOne({
            where: {
              motoId: newMoto.id,
              colorId: colorBd.id,
            },
          });

          if (motoColor) {
            const newStock = Math.floor(Math.random() * 5) + 1;
            await motoColor.update({
              stock: newStock,
            });
            // Suma el stock del color a la suma total
            newMoto.stock += newStock;
          }
          await newMoto.save();
        } catch (error) {
          console.error(`Error al crear o asociar color: ${error}`);
        }
      }

      if (motoCreated) {
        // Si el registro ya existe, aumentar el contador de creados
        createdCount++;
      } else {
        // Si el registro no existe, incrementar el contador de encontrados
        foundCount++;
      }
    }

    console.log(
      `¡Datos cargados exitosamente!, ${createdCount} motos created, ${foundCount} motos found in the database`
    );
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

module.exports = loadApiDataInDb;
