const express = require("express");
const router = express.Router();

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");
const Week = require("../models/Week.model.js");
const Comment = require("../models/comment.model.js")

const { isLoggedIn, isClient } = require("../middlewares/auth.middlewares.js");

//TODO: RUTAS
//GET ("/client/main") => página personal del cliente
router.get("/main", isLoggedIn, isClient, async (req, res, next) => {
  // console.log(req.session.loggedUser._id)
  try {
    const userId = await User.findById(req.session.loggedUser._id).select({
      name: 1,
      suscriptionActive: 1,
      email: 1,
      profilePic:1
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

  const {suscription} = req.body
  console.log(suscription)

  try {
    if (suscription === "false") {
      await User.findByIdAndUpdate(req.session.loggedUser._id, {
        suscriptionActive: true,
      });
    } else if (suscription === "true"){
      await User.findByIdAndUpdate(req.session.loggedUser._id, {
        suscriptionActive: false,
      });
    }
   
    res.redirect("/client/main");
  } catch (error) {
    next(error);
  }
});

router.post("/main/comment", isLoggedIn, isClient, async (req, res, next) => {

  console.log(req.session.loggedUser)

const { comment , userName} = req.body



  try {

  
    if (comment !== "") {

    await Comment.create({
    
     client: userName,
     note: comment
    
    })
    
  res.render("client-views/comment-succed.hbs",{
    userName

  })
  return;

}

res.redirect("/client/main")
} catch (error) {
  next(error)
}


})


//POST ("/client/main") => te borra de una clase
router.post("/main/:classId", isLoggedIn,isClient, async (req, res, next) => {

try {
  
  await Class.findByIdAndUpdate(
    { _id: req.params.classId  },
    { $pull: {students: req.session.loggedUser._id}, $inc: {capacity: +1}}
  )
  res.redirect("/client/main");
} catch (error) {
  next(error)
}


})

//GET (/client/edit-profile") =>  Página edición perfil de usuario
router.get("/edit-profile", isLoggedIn, async (req, res, next) => {

try {
  const userId = await User.findById(req.session.loggedUser._id);
  console.log(userId + "CONSOLE USERID")
  res.render("client-views/client-edit-profile.hbs", {
    userId,
  })
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
    const weekDetails = await Week.findById(
      "64da35b47a1247b56b3042b4"
    ).populate({
      path: "monday tuesday wednesday thursday friday",
      populate: {
        path: "at9 at12 at15 at18",
        model: "Class",
        populate: {
          path: "teacher students",
          model: "User",
        },
      },
    });

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
    const weekDetails = await Week.findById(
      "64da35b47a1247b56b3042b4"
    ).populate({
      path: "monday tuesday wednesday thursday friday",
      populate: {
        path: "at9 at12 at15 at18",
        model: "Class",
        populate: {
          path: "teacher students",
          model: "User",
        },
      },
    });

    if (
      capacity > 0 && res.locals.isUserClient === true &&
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
