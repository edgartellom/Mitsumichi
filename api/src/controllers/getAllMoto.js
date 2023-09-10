const { Op } = require("sequelize");
const { Moto, Brand, Tipo } = require("../db"); // Asegurarse de importar los modelos moto, brand desde db.js

async function getAllMoto(req, res) {
  try {
    // Obtener la página y el límite por página de la solicitud (si no se proporcionan, se asignan valores predeterminados)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calcular el offset (desplazamiento) en la base de datos según la página y el límite por paǵina.
    const offset = (page - 1) * limit;

    const {
      brand,
      tipo,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      sortByBrand,
      sortByPrice,
      search,
    } = req.query;

    let filterOptions = {};

    if (search) {
      filterOptions = {
        ...filterOptions,
        [Op.or]: [
          { "$brand.name$": { [Op.iLike]: `%${search}%` } },
          { motoModel: { [Op.iLike]: `%${search}%` } },
          { "$tipo.name$": { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    // Si brand está presente en la solicitud

    if (brand) {
      const brandNames = brand.split(",");

      // Realiza una consulta para cada marca y luego combina los resultados
      const brandIdsArray = await Promise.all(
        brandNames.map(async (brandName) => {
          const brand = await Brand.findOne({
            where: { name: { [Op.iLike]: brandName } },
          });
          return brand ? brand.id : null;
        })
      );

      // Filtra los resultados nulos y crea un arreglo de IDs válidos
      const validBrandIds = brandIdsArray.filter((id) => id !== null);

      filterOptions = { ...filterOptions, brandId: validBrandIds };
    }

    if (tipo) {
      // Realizamos la consulta para obtener los autos filtrados por el tipo
      const tipoFound = await Tipo.findOne({
        where: { name: { [Op.iLike]: tipo } },
      });
      filterOptions = { ...filterOptions, tipoId: tipoFound.id };
    }

    if (minPrice && maxPrice) {
      // Ambos minPrice y maxPrice están presentes en la solicitud
      // Realizamos la consulta para obtener los autos filtrados por el rango de precios
      filterOptions = {
        ...filterOptions,
        precio: { [Op.between]: [minPrice, maxPrice] },
      };
    } else if (minPrice) {
      filterOptions = { ...filterOptions, precio: { [Op.gte]: minPrice } };
    } else if (maxPrice) {
      filterOptions = { ...filterOptions, precio: { [Op.lte]: maxPrice } };
    }
    if (minYear && maxYear) {
      // Ambos minYear y maxYear están presentes en la solicitud
      // Realizamos la consulta para obtener los autos filtrados por el rango de años
      filterOptions = {
        ...filterOptions,
        year: { [Op.between]: [minYear, maxYear] },
      };
    } else if (minYear) {
      filterOptions = { ...filterOptions, year: { [Op.gte]: minYear } };
    } else if (maxYear) {
      filterOptions = { ...filterOptions, year: { [Op.lte]: maxYear } };
    }

    let orderOptions = [];

    if (sortByBrand && ["ASC", "DESC"].includes(sortByBrand.toUpperCase())) {
      orderOptions.push([{ model: Brand }, "name", sortByBrand.toUpperCase()]);
      // orderOptions.push(["motoModel", sortByBrand.toUpperCase()]);
    }

    if (sortByPrice && ["ASC", "DESC"].includes(sortByPrice.toUpperCase())) {
      orderOptions.push(["precio", sortByPrice.toUpperCase()]);
    }

    if (orderOptions.length === 0) {
      orderOptions.push(["id", "ASC"]);
    }

    // Obtener todos los autos de la base de datos con el límite y el offset adecuados, y contar el total de elementos.
    const { rows: dbMotos, count: totalItems } = await Moto.findAndCountAll({
      limit: limit,
      offset: offset,
      where: {
        ...filterOptions,
        deleted: false, // Agrega esta condición
      },
      include: [
        { model: Brand, attributes: ["name"] },
        { model: Tipo, attributes: ["name"] },
      ],
      order: orderOptions,
    });

    // Calcular el total de páginas disponibles
    const totalPages = Math.ceil(totalItems / limit);

    // Responder con la lista paginada de autos y la información de paginación
    res.status(200).json({
      data: dbMotos,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las motos" });
  }
}

module.exports = getAllMoto;
