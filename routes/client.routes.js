const express = require("express");
const router = express.Router();

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");
const Calendar = require("../models/Calendar.model.js")

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

 const classInfo = await Class.find({students: {$in: req.session.loggedUser._id} }).select({className: 1, weekDay: 1})
//  console.log(classInfo)



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






// GET ("/client/calendar") => pagina calendario con las clases 
router.get("/calendar", isLoggedIn, async (req, res, next)=> {


try {
  
const calendarDetails = await Calendar.findById("64d797df1365c0b4f43508c2")

const classDetails = await Class.find().populate("teacher")


let populateMonday = await calendarDetails.monday.populate("at9 at12 at15 at18")
let populateTuesday= await calendarDetails.tuesday.populate("at9 at12 at15 at18")
let populateWednesday = await calendarDetails.wednesday.populate("at9 at12 at15 at18")
let populateThrusday = await calendarDetails.thursday.populate("at9 at12 at15 at18")
let populateFriday = await calendarDetails.friday.populate("at9 at12 at15 at18")


//console.log(classDetails)
//console.log(calendarDetails.monday.at9[0])

//PROFESORES

const classProffesorMondayAt9 = await Class.findById(calendarDetails.monday.at9[0]._id).populate("teacher")
let professroMondayAt9 = classProffesorMondayAt9.teacher
//console.log(classProffesorMondayAt9.teacher)

//VACANTES


let plazasVacantesLunesAt9 = calendarDetails.monday.at9[0].capacity - calendarDetails.monday.at9[0].students.length

res.render("client-views/calendar-view.hbs", {
  
  calendarDetails,
   plazasVacantesLunesAt9,
   professroMondayAt9
  
})




} catch (error) {
  next(error)
}

})



module.exports = router;
