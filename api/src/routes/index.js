const { Router } = require("express");
const getAllMoto = require("../controllers/getAllMoto")
const createMoto = require("../controllers/createMoto")

const router = Router();

//Rutas para las Motos
router.get("/motos", getAllMoto);

//ruta para publicar motos
router.post("/motos", createMoto);

module.exports = router;
