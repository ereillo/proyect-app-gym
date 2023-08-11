const express = require("express");
const router = express.Router();

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");

const { isLoggedIn } = require("../middlewares/auth.middlewares.js");

//TODO: RUTAS
//GET ("/client/main") => página personal del cliente
router.get("/main", isLoggedIn, async (req, res, next) => {
  try {
    const userId = await User.findById(req.session.loggedUser._id).select({
      name: 1,
      suscriptionActive: 1,
      email: 1,
    });

 const classInfo = await Class.find({students: {$in: req.session.loggedUser._id} }).select({className: 1, weekDay: 1})
 console.log(classInfo)



    if (userId.suscriptionActive === true) {
      res.render("client-views/client-main.hbs", {
        user: userId,
        suscriptionTrue: "Tu suscripción esta activa",
        classInfo 
      })
      
    } else {
      res.render("client-views/client-main.hbs", {
        user: userId,
        suscriptionFalse: "Tu suscripcion esta inactiva"
      });
    }
  } catch (error) {
    next(error);
  }
});


//GET
// router.get("/:classId/update", async (req, res, next) => {
//     try {
//       const response = await Class.findById(req.params.classId);
//       const allUsers = await User.find().select({email: 1})
  
//       const cloneallUsers = JSON.parse(JSON.stringify(allUsers))
//       // clonamos el array porque los array de documentos mongo a veces no nos permite modificarlos
//       res.render("books/edit-form.hbs", {
//         classToUpdate: response,
//         allUsers : cloneallUsers
//       });
//     } catch (err) {
//       next(err);
//     }
//   });

module.exports = router;
