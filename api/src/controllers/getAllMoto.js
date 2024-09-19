const { Op } = require("sequelize");
const { Tipo, Brand, Moto } = require("../db");

async function getAllMoto(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
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

    if (brand) {
      const brandNames = brand.split(",");

      const brandIdsArray = await Promise.all(
        brandNames.map(async (brandName) => {
          const brand = await Brand.findOne({
            where: { name: { [Op.iLike]: brandName } },
          });
          return brand ? brand.id : null;
        })
      );

      const validBrandIds = brandIdsArray.filter((id) => id !== null);

      filterOptions = { ...filterOptions, brandId: validBrandIds };
    }

    if (tipo) {
      const tipoFound = await Tipo.findOne({
        where: { name: { [Op.iLike]: tipo } },
      });
      filterOptions = { ...filterOptions, tipoId: tipoFound.id };
    }

    if (minPrice && maxPrice) {
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
    }

    if (sortByPrice && ["ASC", "DESC"].includes(sortByPrice.toUpperCase())) {
      orderOptions.push(["precio", sortByPrice.toUpperCase()]);
    }

    if (orderOptions.length === 0) {
      orderOptions.push(["id", "ASC"]);
    }

    const { rows: dbMotos, count: totalItems } = await Moto.findAndCountAll({
      limit: limit,
      offset: offset,
      where: filterOptions,
      order: orderOptions,
      include: [
        { model: Brand, attributes: ["name"] },
        { model: Tipo, attributes: ["name"] },
      ],
    });

    const totalPages = Math.ceil(totalItems / limit);

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
