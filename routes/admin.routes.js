const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");



//TODO: RUTAS ADMIN
//GET ("/admin/main") =>  página principal del admin
router.get("/main" , isLoggedIn, isAdmin, (req, res, next) => {
    res.render("admin-views/admin-main.hbs")
})

//GET ("/admin/edit-calendar") => muestra el formulario de edición del calendario
router.get("/edit-calendar", isLoggedIn, isAdmin, (req, res, next) => {
    
})






//POST ("/admin/edit-calendar") => renderiza la información y la edita










module.exports = router;