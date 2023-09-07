const { Review, User, Moto } = require("../db");
async function getAllReviews(req, res) {
  // Obtener los reviews de la base de datos después de haberlos creado
  try {
    const { userId, motoId } = req.query;
    let filterOptions = {};
    if (userId) {
      // Si userId está presente en la solicitud
      // Realizamos la consulta para obtener los reviews filtrados por el id de usuario
      const userFound = await User.findOne({
        where: { id: userId },
      });
      filterOptions = { ...filterOptions, userId: userFound.id };
    }

    if (motoId) {
      // Si motoId está presente en la solicitud
      // Realizamos la consulta para obtener los reviews filtrados por el id de la moto
      const motoFound = await Moto.findOne({
        where: { id: motoId },
      });
      filterOptions = { ...filterOptions, motoId: motoFound.id };
    }

    const dbReviews = await Review.findAll({
      where: filterOptions,
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Moto,
          attributes: ["brandId", "motoModel"],
        },
      ],
    });
    // Responder con la lista completa de reviews
    res.status(200).json(dbReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los reviews" });
  }
}

module.exports = getAllReviews;
