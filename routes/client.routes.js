const express = require("express");
const router = express.Router();

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");
const Week = require("../models/Week.model.js");

const { isLoggedIn } = require("../middlewares/auth.middlewares.js");

//TODO: RUTAS
//GET ("/client/main") => página personal del cliente
router.get("/main", isLoggedIn, async (req, res, next) => {
  // console.log(req.session.loggedUser._id)
  try {
    const userId = await User.findById(req.session.loggedUser._id).select({
      name: 1,
      suscriptionActive: 1,
      email: 1,
    });

    const classInfo = await Class.find({
      students: { $in: req.session.loggedUser._id },
    }).select({ className: 1, weekDay: 1 });
    //  console.log(classInfo)

    if (userId.suscriptionActive === true) {
      res.render("client-views/client-main.hbs", {
        user: userId,
        suscriptionTrue: "Tu suscripción esta activa",
        classInfo,
      });
    } else {
      res.render("client-views/client-main.hbs", {
        user: userId,
        suscriptionFalse: "Tu suscripcion esta inactiva",
      });
    }
  } catch (error) {
    next(error);
  }
});

//GET ("/client/classes") => página con nuestras clases
router.get("/classes", (req, res, next) => {
  res.render("client-views/classes-view.hbs");
});

//GET ("/client/classes") => página con nuestras clases
router.get("/teachers", (req, res, next) => {
  res.render("client-views/teachers-view.hbs");
});

// GET ("/client/calendar") => pagina calendario con las clases
router.get("/calendar", isLoggedIn, async (req, res, next) => {

// week Lucas: 64da35b47a1247b56b3042b4
// week Eve: 64da46b6f1fd57abc7f34356

  try {
    const weekDetails = await Week.findById("64da46b6f1fd57abc7f34356").populate({
      path: "monday tuesday wednesday thursday friday",
      populate: {
          
          path: "at9 at12 at15 at18",
          model: "Class",
          populate: {
            
           path: "teacher students",
           model: "User"

          },
        }
    })
  
  // console.log(weekDetails.monday.at9.className)
  res.render("client-views/calendar-view.hbs",{ weekDetails})
  } catch (error) {
    next(error);
  }
});





// POST ("/client/calendar") => renderizar los datos del calendario y añadirlos a la DB
router.post("/calendar", isLoggedIn, async (req, res, next) => {

const {name} = req.body
let mondayAt9Id = req.body.weekDetails.monday.at9._id
console.log("ESTE CONSOLELOG" + mondayAt9Id)


const clientSessionId = req.session.loggedUser._id;

  try {
    
    const weekDetails = await Week.findById("64da46b6f1fd57abc7f34356").populate({
      path: "monday tuesday wednesday thursday friday",
      populate: {
          
          path: "at9 at12 at15 at18",
          model: "Class",
          populate: {
            
           path: "teacher students",
           model: "User"

          },
        }
    })


    let newCapacity = weekDetails.monday.at9.capacity -1
    
    weekDetails.monday.at9.students.push(clientSessionId)
   
    await Class.findByIdAndUpdate(mondayAt9Id, {

    })

    await Class.findByIdAndUpdate(weekDetails.monday.at9._id, {
      capacity: newCapacity
    })
    
    
   console.log(weekDetails.monday.at9.students)
  //  console.log("ESTO ES" + clientSessionId)

    // if (weekDetails.students.includes(clientSessionId)) {
    //   res.status(400).render("client-views/calendar-view.hbs", {
    //     errorMessage: "Ya estas apuntado a esta clase",
    //   });
    //   return;
    // } else {
    //   mondayClassAt9.students.push(clientSessionId);
    // }

    // console.log("LSITA ESTUDIANTES ACTUALIZADA" + mondayClassAt9.students);
    // let newStudentList = mondayClassAt9.students;
    // console.log("ID DE CLASE ACTUAL" + mondayClassAt9);
    // //console.log("ARRAY DE ESTUDIANTES" + mondayClassAt9.students)

    // let newCapacity =
    //   calendarDetails.monday.at9[0].capacity - newStudentList.length;

    // await Class.findByIdAndUpdate(mondayClassAt9Id, {
    //   students: newStudentList,
    //   capacity: newCapacity,
    // });

    //   //!queremos comprobar si metiéndole a joinAClass los parámetros adecuados, el botón funciona
    //  function joinAClass(mondayClassAt9Id, clientSessionId) {

    //   let newCapacity = calendarDetails.monday.at9[0].capacity - 1
    //   mondayClassAt9Id.students.push(clientSessionId)

    //   realizarCosa
    // }
    res.redirect("/client/calendar");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
