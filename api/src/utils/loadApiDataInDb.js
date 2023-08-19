const fs = require("fs");
const { Moto, Brand, MotoModel } = require("../db");

const path = require("path");
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

      // Cargar MotoModel (modelo) si no existe
      const [modeloBd, modeloCreado] = await MotoModel.findOrCreate({
        where: { name: modelo },
        defaults: {
          brandId: marcaBd.id,
        },
      });

      // Cargar Moto si no existe
      const [newMoto, motoCreated] = await Moto.findOrCreate({
        where: { id },
        defaults: {tipo,
          motoModelId: modeloBd.id,
          brandId: marcaBd.id,
          precio,
          year,
          imageUrl,
          combustible,
          colorDisponible,
          fichaTecnica,
        },
      });

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
