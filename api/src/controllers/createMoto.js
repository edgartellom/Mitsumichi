const { Moto, Brand, Tipo, Color, MotoColor } = require("../db.js");

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
      //colorDisponible,
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
      !fichaTecnica
      // !colorDisponible
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

    // const existingModel = await MotoModel.findOne({
    const existingModel = await Moto.findOne({
      where: Sequelize.where(
        // Sequelize.fn("lower", Sequelize.col("name")),
        Sequelize.fn("lower", Sequelize.col("motoModel")),
        Sequelize.fn("lower", modelo)
      ),
    });

    const existingTipo = await Tipo.findOne({
      where: Sequelize.where(
        Sequelize.fn("lower", Sequelize.col("name")),
        Sequelize.fn("lower", tipo)
      ),
    });

    if (existingBrand && existingModel) {
      // La marca y el modelo ya existen, retornar un mensaje de error
      return res.status(400).json({
        error: "Este modelo de moto ya existe, puedes crear uno nuevo.",
      });
    }

    // Crear la marca si no existe
    let brandId;
    if (!existingBrand) {
      const newBrand = await Brand.create({ name: marca });
      brandId = newBrand.id;
    } else {
      brandId = existingBrand.id;
    }

    // Crear el tipo si no existe
    let tipoId;
    if (!existingTipo) {
      const newTipo = await Tipo.create({ name: tipo });
      tipoId = newTipo.id;
    } else {
      tipoId = existingTipo.id;
    }

    // Crear la nueva moto en la base de datos
    const newMoto = await Moto.create({
      id: newId,
      brandId,
      tipoId,
      motoModel: modelo,
      tipo,
      precio,
      year,
      imageUrl,
      combustible,
      fichaTecnica,
    });

    // Asociar los colores a la moto
    // for (const colorName of colorDisponible) {
    //   try {
    //     const existingColor = await Color.findOne({
    //       where: Sequelize.where(
    //         Sequelize.fn("lower", Sequelize.col("name")),
    //         Sequelize.fn("lower", colorName)
    //       ),
    //     });

    //     // Crear el color si no existe
    //     let color;
    //     if (!existingColor) {
    //       color = await Color.create({ name: colorName });
    //     } else {
    //       color = existingColor;
    //     }

    //     // Asocia el color a la moto
    //     if (color) {
    //       await newMoto.addColor(color);
    //     }

    //     // Obtiene la relación entre la moto y el color (MotoColor)
    //     const motoColor = await MotoColor.findOne({
    //       where: {
    //         motoId: newMoto.id,
    //         colorId: color.id,
    //       },
    //     });

    //     if (motoColor) {
    //       // Suma el stock del color a la suma total
    //       newMoto.stock += motoColor.stock;
    //     }
    //     await newMoto.save();
    //   } catch (error) {
    //     console.error(`Error al crear o asociar color: ${error}`);
    //   }
    // }
    const motoCreated = await Moto.findByPk(newMoto.id, {
      include: [
        { model: Brand, attributes: ["name"] },
        { model: Tipo, attributes: ["name"] },
        // { model: Color, attributes: ["name"] },
      ],
    });

    res.status(201).json(motoCreated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = createMoto;
