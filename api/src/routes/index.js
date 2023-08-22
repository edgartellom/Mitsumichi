const { Router } = require("express");
const getAllMoto = require("../controllers/getAllMoto")
const createMoto = require("../controllers/createMoto")
const getAllBrands = require("../controllers/getAllBrands")
const getAllMotoModels = require("../controllers/getAllMotoModels")

const router = Router();

//Rutas para las Motos
router.get("/motos", getAllMoto);
router.get("/marcas", getAllBrands);
router.get("/modelos", getAllMotoModels)
router.get("/tipo", getAllMoto)


//ruta para publicar motos
router.post("/motos", createMoto);





module.exports = router;
