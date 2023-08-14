const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");

const { isLoggedIn, isTeacher } = require("../middlewares/auth.middlewares.js");

const uploader = require("../middlewares/cloudinary.middleware.js")

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

//POST ("/teachers/main") => ruta que recibe la imagen para subirla a cloudinary
router.post("/edit-profile", isLoggedIn, isTeacher, uploader.single("profilePic"), (req, res, next) => {

  console.log(req.file)

  User.findByIdAndUpdate(req.session.loggedUser._id, {
    profilePic: req.file.path
  })
  .then(() => {
    res.redirect("/teachers/main")
  })
  .catch((error) => {
    next(error)
  })
})


//POST ("/teachers/edit-profile") => Renderiza la información del formulario y lo edita
router.post("/edit-profile", isLoggedIn, isTeacher, async (req, res, next) => {

  const { name, surname, email, password, newPassword, confirmNewPassword, profilePic } = req.body;
  const teacherId = await User.findById(req.session.loggedUser._id)

//campos obligatorios
if (
  name === "" ||
  surname === "" ||
  email === "" 
) {
  res.status(400).render("teachers-views/teachers-edit-profile.hbs", {
    errorMessage: "Nombre, apellido y correo son obligatorios",
    teacherId
  });
  return;
}

//validación requisitos del formulario

//! newPassword y confirmPassword tienen que ser la misma
if (newPassword !== "") {


  //! validación contraseña correcta

//   const isPasswordCorrect = await bcrypt.compare(
//     password,
//     teacherId.password
//   );
//   //  console.log(isPasswordCorrect);
//   if (isPasswordCorrect === false) {
//     res.status(400).render("teachers-views/teachers-edit-profile.hbs", {
//       teacherId,
//       errorMessage: "La contraseña no es correcta",
//     });
//     return;
//   }

// if (newPassword !== confirmNewPassword) {
//   res.status(400).render("teachers-views/teachers-edit-profile.hbs", {
//     teacherId,
//     errorMessage: "La nueva contraseña no coincide",
//   });
//   return;
// }

//! Validacion de requisitos contraseña segura

const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (regexPassword.test(newPassword) === false) {
    res.status(400).render("teachers-views/teachers-edit-profile.hbs", {
      teacherId,
      errorMessage:
        "La nueva contraseña debe tener una mayusucula, una minuscula, un caracter especial y tener 8 o más caracteres",
    });

    return; // detener la ejecucion de la ruta
  }

//! cifrado de la contraseña
const salt = await bcrypt.genSalt(10);
const passwordHash = await bcrypt.hash(newPassword, salt);
// console.log(passwordHash);

}

//! que el nuevo email no esté ya registrado

try {
const foundEmail = await User.findOne({ email: email });
    // console.log(foundEmail);
    if (foundEmail !== null && email !== teacherId.email) {
      res.status(400).render("teachers-views/teachers-edit-profile.hbs", {
        errorMessage: "Correo electrónico ya en uso",
        teacherId
      });
      return;
}



//TODO: edición del perfil del profesor

if(newPassword === "") {

  await User.findByIdAndUpdate(req.session.loggedUser._id, {
    name,
    surname,
    email,
    password: teacherId.password,
    profilePic
  })
  res.redirect("/teachers/main")

} else {

  await User.findByIdAndUpdate(req.session.loggedUser._id, {
    name,
    surname,
    email,
    password: newPassword,
    profilePic
  })
  res.redirect("/teachers/main")

}


} catch (error) {
  next(error)
}



})

module.exports = router;
