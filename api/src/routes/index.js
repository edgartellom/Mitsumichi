const { Router } = require("express");
const getAllMoto = require("../controllers/getAllMoto");
const createMoto = require("../controllers/createMoto");
const getAllBrands = require("../controllers/getAllBrands");
const deleteMoto = require("../controllers/deleteMoto.js");
const getAllReviews = require("../controllers/getAllReviews");
const createReview = require("../controllers/createReview");
const getMotoByID = require("../controllers/getMotoByID");
const editMoto = require("../controllers/editMoto");
const getAllTipos = require("../controllers/getAllTipos");
const getAllColors = require("../controllers/getAllColors");
const sendEmail = require("../controllers/sendEmail");
//-------------------------------------------------------
// const desableMoto = require("../controllers/disableMoto");
// const restoreMoto = require("../controllers/restoreMoto");
const marcarDesmarcarMoto = require("../controllers/marcarDesmarcarMoto");
const editStockMoto = require("../controllers/editStockMoto");
//-------------------------------------------------------

const router = Router();

//Rutas para las Motos
router.get("/motos", getAllMoto);
router.get("/marcas", getAllBrands);
router.get("/tipos", getAllTipos);
router.get("/colores", getAllColors);
router.get("/motos/:id", getMotoByID);
router.delete("/motos/:id", deleteMoto);
//------------------------------------------
// router.delete("/moto/:id", desableMoto); params
// router.post("/moto/restaurar/:id", restoreMoto); params
router.put("/moto/:id", marcarDesmarcarMoto); //body
//------------------------------------------
router.put("/motos/:id", editMoto);

//ruta para publicar motos
router.post("/motos", createMoto);

//Rutas para las Reviews
router.get("/reviews", getAllReviews);
router.post("/reviews", createReview);

router.put("/editStock", editStockMoto);

router.post("/enviar-correo", sendEmail);

module.exports = router;
