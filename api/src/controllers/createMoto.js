const { Moto, Brand, MotoModel } = require("../db.js");

const Sequelize = require("sequelize");

async function createMoto(req, res) {
  try {
    const {
      marca,
      modelo,
      tipo,
      precio,
      year,
      imageUrl,
      combustible,
      fichaTecnica,
      colorDisponible,
    } = req.body;

    console.log(req.body);

    // Validación de campos obligatorios
    if (
      !marca ||
      !modelo ||
      !tipo ||
      !precio ||
      !year ||
      !imageUrl ||
      !combustible ||
      !fichaTecnica ||
      !colorDisponible
    ) {
      return res.status(400).json({
        error:
          "Todos los campos son obligatorios, debe llenarlos correctamente",
      });
    }

    if (typeof precio !== "number" || precio <= 0) {
      return res
        .status(400)
        .json({ error: "El precio debe ser un número positivo" });
    }

    // const estadoRegex = /^(nuevo|usado)$/i;
    // if (!estadoRegex.test(estado)) {
    //   return res
    //     .status(400)
    //     .json({ error: "El estado debe ser 'nuevo' o 'usado'" });
    // }

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

    // Obtener el último ID de la tabla Moto en la base de datos
    const lastMoto = await Moto.findOne({
      attributes: [[Sequelize.fn("max", Sequelize.col("id")), "maxId"]],
    });
    const lastId = lastMoto.getDataValue("maxId");

    // Incrementar el último ID en 1 para obtener el nuevo ID
    const newId = lastId ? lastId + 1 : 1;

    // Verificar si el nuevo ID ya existe en la base de datos
    const motoWithId = await Moto.findByPk(newId);
    if (motoWithId) {
      // Si el ID ya existe, retorna un mensaje de error
      return res.status(400).json({ error: "El ID ya está en uso" });
    }
    // Verificar si la marca y el modelo existen en la base de datos
    const existingBrand = await Brand.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("name")),
        Sequelize.fn("lower", marca)
      ),
    });

    const existingModel = await MotoModel.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("name")),
        Sequelize.fn("lower", modelo)
      ),
    });

    if (existingBrand && existingModel) {
      // La marca y el modelo ya existen, retornar un mensaje de error
      return res.status(400).json({ error: "Esta moto ya existe" });
    }

    // Crear la marca si no existe
    let brandId;
    if (!existingBrand) {
      const newBrand = await Brand.create({ name: marca });
      brandId = newBrand.id;
    } else {
      brandId = existingBrand.id;
    }

    // Crear el modelo si no existe
    let motoModelId;
    if (!existingModel) {
      const newModel = await MotoModel.create({ name: modelo, brandId });
      motoModelId = newModel.id;
    } else {
      motoModelId = existingModel.id;
    }

    // Crear la nueva moto en la base de datos
    const newMoto = await Moto.create({
      id: newId,
      motoModelId,
      brandId,
      tipo,
      precio,
      year,
      imageUrl,
      combustible,
      fichaTecnica,
      colorDisponible,
    });

    res.status(201).json(newMoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = createMoto;

/* 
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
      where: { tipo },
      defaults: {
        motoModelId: modeloBd.id,
        brandId: marcaBd.id,
        tipo,
        precio,
        year,
        imageUrl,
        kilometraje,
        combustible,
        fichaTecnica,
      },
    });
*/
