const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");
const Week = require("../models/Week.model.js");
const Comment = require("../models/comment.model.js");

const { isLoggedIn, isClient } = require("../middlewares/auth.middlewares.js");

const uploader = require("../middlewares/cloudinary.middleware.js");

//weekId Eve: 64da46b6f1fd57abc7f34356
//weekId Lucas: 64da35b47a1247b56b3042b4

//TODO: RUTAS
//GET ("/client/main") => página personal del cliente
router.get("/main", isLoggedIn, isClient, async (req, res, next) => {
  // console.log(req.session.loggedUser._id)
  try {
    const userId = await User.findById(req.session.loggedUser._id).select({
      name: 1,
      suscriptionActive: 1,
      email: 1,
      profilePic: 1,
    });

    const classInfo = await Class.find({
      students: { $in: req.session.loggedUser._id },
    }).select({ className: 1, weekDay: 1 });
    //  console.log(classInfo)

    res.render("client-views/client-main.hbs", {
      user: userId,
      suscriptionTrue: userId.suscriptionActive,
      classInfo,
    });
  } catch (error) {
    next(error);
  }
});

//POST ("/client/main") => cambia el estado de la suscripción de true a false
router.post("/main", isLoggedIn, isClient, async (req, res, next) => {
  const { suscription } = req.body;
  console.log(suscription);

  try {
    if (suscription === "false") {
      await User.findByIdAndUpdate(req.session.loggedUser._id, {
        suscriptionActive: true,
      });
    } else if (suscription === "true") {
      await User.findByIdAndUpdate(req.session.loggedUser._id, {
        suscriptionActive: false,
      });
    }

    res.redirect("/client/main");
  } catch (error) {
    next(error);
  }
});

//POST ("client/main/cooment") => formulario de creacion de comentario
router.post("/main/comment", isLoggedIn, isClient, async (req, res, next) => {
  console.log(req.session.loggedUser);

  const { comment, userName } = req.body;

  try {
    if (comment !== "") {
      await Comment.create({
        client: userName,
        note: comment,
      });

      res.render("client-views/comment-succed.hbs", {
        userName,
      });
      return;
    }

    res.redirect("/client/main");
  } catch (error) {
    next(error);
  }
});

//POST ("/client/main") => te borra de una clase
router.post("/main/:classId", isLoggedIn, isClient, async (req, res, next) => {
  try {
    await Class.findByIdAndUpdate(
      { _id: req.params.classId },
      {
        $pull: { students: req.session.loggedUser._id },
        $inc: { capacity: +1 },
      }
    );
    res.redirect("/client/main");
  } catch (error) {
    next(error);
  }
});

//GET (/client/edit-profile") =>  Página edición perfil de usuario
router.get("/edit-profile", isLoggedIn, isClient, async (req, res, next) => {
  try {
    const userId = await User.findById(req.session.loggedUser._id);
    console.log(userId + "CONSOLE USERID");
    res.render("client-views/client-edit-profile.hbs", {
      userId,
    });
  } catch (error) {
    next(error);
  }
});

//POST ("/client/edit-profile-img") => ruta que recibe la imagen para subirla a cloudinary
router.post(
  "/edit-profile-img",
  isLoggedIn,
  isClient,
  uploader.single("userProfilePic"),
  (req, res, next) => {
    console.log(req.file);

    User.findByIdAndUpdate(req.session.loggedUser._id, {
      profilePic: req.file.path,
    })
      .then(() => {
        res.redirect("/client/main");
      })
      .catch((error) => {
        next(error);
      });
  }
);

//POST ("/client/edit-profile") => Renderiza la información del formulario y lo edita
router.post("/edit-profile", isLoggedIn, isClient, async (req, res, next) => {
  const {
    name,
    surname,
    email,
    password,
    newPassword,
    confirmNewPassword,
    profilePic,
  } = req.body;
  const userId = await User.findById(req.session.loggedUser._id);

  //campos obligatorios
  if (name === "" || surname === "" || email === "") {
    res.status(400).render("client-views/client-edit-profile.hbs", {
      errorMessage: "Nombre, apellido y correo son obligatorios",
      userId,
    });
    return;
  }

  //validación requisitos del formulario

  //! newPassword y confirmPassword tienen que ser la misma

  const isPasswordCorrect = await bcrypt.compare(password, userId.password);

  if (isPasswordCorrect === false) {
    res.status(400).render("client-views/client-edit-profile.hbs", {
      userId,
      errorMessage: "La contraseña no es correcta",
    });
    return;
  }

  if (newPassword !== "") {
    //! validación contraseña correcta

    //  console.log(isPasswordCorrect);

    if (newPassword !== confirmNewPassword) {
      res.status(400).render("client-views/client-edit-profile.hbs", {
        userId,
        errorMessage: "La nueva contraseña no coincide",
      });
      return;
    }

    //! Validacion de requisitos contraseña segura

    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if (regexPassword.test(newPassword) === false) {
      res.status(400).render("client-views/client-edit-profile.hbs", {
        userId,
        errorMessage:
          "La nueva contraseña debe tener una mayusucula, una minuscula, un caracter especial y tener 8 o más caracteres",
      });

      return; // detener la ejecucion de la ruta
    }
  }

  //! que el nuevo email no esté ya registrado

  try {
    const foundEmail = await User.findOne({ email: email });
    // console.log(foundEmail);
    if (foundEmail !== null && email !== userId.email) {
      res.status(400).render("client-views/client-edit-profile.hbs", {
        errorMessage: "Correo electrónico ya en uso",
        userId,
      });
      return;
    }

    //! cifrado de la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    // console.log(passwordHash);

    //TODO: edición del perfil del usuario

    if (newPassword === "") {
      await User.findByIdAndUpdate(req.session.loggedUser._id, {
        name,
        surname,
        email,
        password: userId.password,
        profilePic,
      });
      res.redirect("/client/main");
    } else {
      await User.findByIdAndUpdate(req.session.loggedUser._id, {
        name,
        surname,
        email,
        password: passwordHash,
        profilePic,
      });
      res.redirect("/client/main");
    }
  } catch (error) {
    next(error);
  }
});


//GET ("client/delete-profile") => redirecciona al usuario despues de eliminarlo
router.get("/delete-profile", (req, res, next) => {
res.render("client-views/deleted-account.hbs")
  
})
//POST ("/client/delete-profile") => elimina al usuario de la DB
router.post("/delete-profile", isLoggedIn, isClient, async (req, res, next) => {

try {
  
await User.findByIdAndDelete(req.session.loggedUser._id)

req.session.destroy(()=> {
  res.redirect("/client/delete-profile")})
} catch (error) {
  next(error)
}

})

//GET ("/client/classes") => página con nuestras clases
router.get("/classes", (req, res, next) => {
  res.render("client-views/classes-view.hbs");
});

//GET ("/client/classes") => página con nuestros profesores
router.get("/teachers", (req, res, next) => {
  res.render("client-views/teachers-view.hbs");
});

// GET ("/client/calendar") => pagina calendario con las clases
router.get("/calendar", isLoggedIn, async (req, res, next) => {
  // week Lucas: 64da35b47a1247b56b3042b4
  // week Eve: 64da46b6f1fd57abc7f34356

  try {
    const weekDetails = await getWeekDetails()

    // console.log(weekDetails.monday.at9.className)
    res.render("client-views/calendar-view.hbs", { weekDetails });
  } catch (error) {
    next(error);
  }
});

// POST ("/client/calendar") => renderizar los datos del calendario y añadirlos a la DB
router.post("/calendar/:classId", isLoggedIn, async (req, res, next) => {
  const { capacity, students, className, weekDay } = req.body;

  const clientSessionId = req.session.loggedUser._id;

  const userId = await User.findById(clientSessionId).select({
    suscriptionActive: 1,
  });

  console.log("ESTE CONSOLE USER" + userId);

  try {
    const weekDetails = await getWeekDetails()

    if (
      capacity > 0 &&
      res.locals.isUserClient === true &&
      students.includes(clientSessionId) === false &&
      userId.suscriptionActive === true
    ) {
      await Class.findByIdAndUpdate(
        { _id: req.params.classId },
        { $push: { students: clientSessionId }, $inc: { capacity: -1 } }
      );
      res.redirect("/client/main");
      return;
    } else if (students.includes(clientSessionId) === true) {
      res.status(400).render("client-views/calendar-view.hbs", {
        weekDetails,
        errorMessage: `Ya estas apuntado a ${className} el ${weekDay}`,
      });
      return;
    } else if (
      capacity < 1 &&
      students.includes(clientSessionId) === false &&
      userId.suscriptionActive === true
    ) {
      res.status(400).render("client-views/calendar-view.hbs", {
        weekDetails,
        errorMessage: `No quedan plazas disponibles para ${className} el ${weekDay}`,
      });
      return;
    } else if (userId.suscriptionActive === false) {
      res.status(400).render("client-views/calendar-view.hbs", {
        weekDetails,
        errorMessageSuscription: `Suscríbete para apuntarte a una clase`,
      });
      return;
    }

    res.redirect("/client/calendar");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
