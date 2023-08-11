const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//TODO: importación de modelos
const User = require("../models/User.model.js");

//TODO: RUTAS DE SIGNUP

//GET "/auth/signup" => renderiza al usuario un formulario de registro
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

//POST "/auth/signup" => recibir la info del usuario y crearlo en la DB
router.post("/signup", async (req, res, next) => {
  console.log(req.body);

  const { name, surname, email, password, confirmPassword } = req.body;

  //validación formulario completo
  if (
    name === "" ||
    surname === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    res.status(400).render("auth/signup.hbs", {
      errorMessage: "Todos los campos son obligatorios",
    });
    return;
  }

  //validación requisitos del formulario

  //! misma contraseña  OK ¿¿EXPLÍQUENOS ESTO PARFAVAR??
  if (password !== confirmPassword) {
    res.status(400).render("auth/signup.hbs", {
        errorMessage: "Las contraseñas no coinciden",
      })
    return;
  }

  //! contraseña segura  OK
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (regexPassword.test(password) === false) {
    res.status(400).render("auth/signup.hbs", {
      errorMessage:
        "La contraseña debe tener al menos, una mayuscula, una minuscula, un caracter especial y tener 8 caracteres o más",
    });
    return;
  }

  //! que el email no esté ya registrado

  try {
    const foundEmail = await User.findOne({ email: email });
    console.log(foundEmail);
    if (foundEmail !== null) {
        res.status(400).render("auth/signup.hbs", {
        errorMessage: "Correo electrónico ya en uso"
      });
    return;
    }

 //! cifrado de la contraseña  OK
 const salt = await bcrypt.genSalt(10);
 const passwordHash = await bcrypt.hash(password, salt);
 console.log(passwordHash);


    //TODO: creación de nuevo usuario
  await User.create({
    name,
    surname,
    email, 
    password: passwordHash
  })
  res.redirect("/auth/login")
  } catch (error) {
    next(error);
  }
});



//GET "/auth/login"
router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")
})



module.exports = router



