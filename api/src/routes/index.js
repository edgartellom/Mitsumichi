const { Router } = require("express");
const getAllMoto = require("../controllers/getAllMoto");
const createMoto = require("../controllers/createMoto");
const getAllBrands = require("../controllers/getAllBrands");
const deleteMoto = require("../controllers/deleteMoto.js");
const getAllReviews = require("../controllers/getAllReviews");
const createReview = require("../controllers/createReview");

const router = Router();

//Rutas para las Motos
router.get("/motos", getAllMoto);
router.get("/marcas", getAllBrands);
router.delete("/motos/:id", deleteMoto);

//ruta para publicar motos
router.post("/motos", createMoto);


//Rutas para las Reviews
router.get("/reviews", getAllReviews);
router.post("/reviews", createReview);

module.exports = router;
