const { Router } = require("express");
const getAllMoto = require("../controllers/getAllMoto")
const getALLBrands = require("../controllers/getAllBrands")
const getAllMotoModels = require("../controllers/getAllMotoModels")
const router = Router();

//Rutas para las Motos
router.get("/motos", getAllMoto);
router.get("/marcas", getALLBrands);
router.get("/modelos", getAllMotoModels)



module.exports = router;
