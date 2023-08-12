const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");

const { isLoggedIn, isTeacher } = require("../middlewares/auth.middlewares.js");


//TODO: RUTAS TEACHERS
//GET ("/teachers/main") = página principal del profesor
router.get("/main", isLoggedIn, isTeacher, async (req, res, next) => {

  try {
    const teacherId = await User.
    findById(req.session.loggedUser._id)
    .select({
        name: 1
    })
    
    const classInfo = await Class.find({teacher: {$in: req.session.loggedUser._id} }).select({className: 1, weekDay: 1})
    res.render("teachers-views/teachers-main.hbs", {
        classInfo,
        teacher: teacherId
    })
  } catch (error) {
     next(error)
  }


})


//GET ("/teachers/edit-profile") => Página edición perfil del trabajador
router.get("/edit-profile", isLoggedIn, isTeacher, async (req, res, next) => {


try {
  const teacherId = await User.findById(req.session.loggedUser._id)
  res.render("teachers-views/teachers-edit-profile.hbs", {
    teacherId
  })
} catch (error) {
  next(error)
}

})


//POST ("/teachers/edit-profile") => Renderiza la información del formulario y lo edita
router.post("/edit-profile", isLoggedIn, isTeacher, async (req, res, next) => {

  const { name, surname, email, password, newPassword, confirmNewPassword, profilePic } = req.body;
  const teacherId = await User.findById(req.session.loggedUser._id)

//campos obligatorios
if (
  name === "" ||
  surname === "" ||
  email === "" ||
  password === "" 
) {
  res.status(400).render("teachers-views/teachers-edit-profile.hbs", {
    errorMessage: "Nombre, apellido, correo y contraseña son obligatorios",
    teacherId
  });
  return;
}

//validación requisitos del formulario

//! validación contraseña correcta

const isPasswordCorrect = await bcrypt.compare(
  password,
  teacherId.password
);
//  console.log(isPasswordCorrect);
if (isPasswordCorrect === false) {
  res.status(400).render("teachers-views/teachers-edit-profile.hbs", {
    teacherId,
    errorMessage: "La contraseña no es correcta",
  });
  return;
}

//! newPassword y confirmPassword tienen que ser la misma

if (newPassword !== confirmNewPassword) {
  res.status(400).render("teachers-views/teachers-edit-profile.hbs", {
    teacherId,
    errorMessage: "La nueva contraseña no coincide",
  });
  return;
}

//! que el nuevo email no esté ya registrado
try {
const foundEmail = await User.findOne({ email: email });
    // console.log(foundEmail);
    if (foundEmail !== null) {
      res.status(400).render("teachers-views/teachers-edit-profile.hbs", {
        errorMessage: "Correo electrónico ya en uso",
        teacherId
      });
      return;
}

//! cifrado de la contraseña
const salt = await bcrypt.genSalt(10);
const passwordHash = await bcrypt.hash(newPassword, salt);
// console.log(passwordHash);



//TODO: edición del perfil del profesor
await User.findByIdAndUpdate(req.session.loggedUser._id, {
  name,
  surname,
  email,
  password: newPassword,
  profilePic
})
res.redirect("/teachers/main")
} catch (error) {
  next(error)
}



})








module.exports = router;
