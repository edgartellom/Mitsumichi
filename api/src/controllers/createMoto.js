const { Moto, Brand, MotoModel } = require("../db.js");

async function createMoto (req, res){
    try {
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
        } = req.body;
    
        //validacion
        if (
          !id ||
          !marca ||
          !modelo ||
          !tipo ||
          !precio ||
          !year ||
          !imageUrl ||
          !colorDisponible ||
          !combustible ||
          !fichaTecnica
        ) {
          return res
            .status(400)
            .json({
              error:
                "Todos los campos son obligatorios, debe llenarlos correctamente",
            });
        }
    
        if (typeof precio !== "number" || precio <= 0) {
          return res
            .status(400)
            .json({ error: "El precio debe ser un número positivo" });
        }
    
    
        const currentYear = new Date().getFullYear();
        if (typeof year !== "number" || year < 2010 || year > currentYear) {
          return res.status(400).json({ error: "Año inválido" });
        }
    
        const imageUrlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i;
        if (!imageUrlRegex.test(imageUrl)) {
          return res
            .status(400)
            .json({ error: "La URL de la imagen no es válida" });
        }
    
        if (
          //validacion para que ficha tecnica contenga estos datos especificos
          typeof fichaTecnica !== "object" ||
          !fichaTecnica.motor ||
          !fichaTecnica.pasajeros ||
          !fichaTecnica.cilindrada ||
          !fichaTecnica.velocidades 
        ) {
          return res.status(400).json({ error: "La ficha técnica es inválida" });
        }
    
        // Crear Brand (marca) si no existe
        const [marcaBd, marcaCreada] = await Brand.findOrCreate({
          where: { name: marca },
        });
    
        // Crear MotoModel (modelo) si no existe
        const [modeloBd, modeloCreado] = await MotoModel.findOrCreate({
          where: { name: modelo },
          defaults: {
            brandId: marcaBd.id,
          },
        });
    
        // Crear la nueva moto en la base de datos
        const [newMoto, motoCreated] = await Moto.findOrCreate({
          where: { id },
          defaults: {
            motoModelId: modeloBd.id,
            brandId: marcaBd.id,
            tipo,
            precio,
            year,
            imageUrl,
            colorDisponible,
            combustible,
            fichaTecnica,
          },
        });
     
        res.status(201).json(newMoto);
        console.log(newMoto);
      }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la moto" });
      }
}

module.exports = createMoto;