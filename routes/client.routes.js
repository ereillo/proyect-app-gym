const express = require("express");
const router = express.Router();

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js")

const {isLoggedIn} = require("../middlewares/auth.middlewares.js")

//TODO: RUTAS
//GET ("/client/main") => página personal del cliente
router.get("/main", isLoggedIn, (req, res, next) => {


   //!AQUÍ NOS QUEDAMOS


})










module.exports = router;