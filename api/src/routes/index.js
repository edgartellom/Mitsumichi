const { Router } = require("express");
const getAllMoto = require("../controllers/getAllMoto");
const createMoto = require("../controllers/createMoto");
const getAllBrands = require("../controllers/getAllBrands");
const deleteMoto = require("../controllers/deleteMoto.js");
const getAllReviews = require("../controllers/getAllReviews");
const createReview = require("../controllers/createReview");
const getMotoByID = require("../controllers/getMotoByID");
const editMoto = require("../controllers/editMoto");
const createUser = require("../controllers/createUser");
const loginUser = require("../controllers/loginUser");


const router = Router();

//Rutas para las Motos
router.get("/motos", getAllMoto);
router.get("/marcas", getAllBrands);
router.get("/motos/:id", getMotoByID);
router.delete("/motos/:id", deleteMoto);
router.put("/motos/:id", editMoto);

//ruta para publicar motos
router.post("/motos", createMoto);


//Rutas para las Reviews
router.get("/reviews", getAllReviews);
router.post("/reviews", createReview);

//Rutas para los usuarios
router.post("/users", createUser);
router.post("/login", loginUser);


module.exports = router;