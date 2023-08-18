const { Router } = require("express");
const getAllMoto = require("../controllers/getAllMoto")

const router = Router();

//Rutas para las Motos
router.get("/motos", getAllMoto)

module.exports = router;
