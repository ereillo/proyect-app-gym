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


//GET ("/client/classes") => página con nuestras clases
router.get("/classes", (req, res, next) => {
  res.render("client-views/classes-view.hbs")
})

//GET ("/client/classes") => página con nuestras clases
router.get("/teachers", (req, res, next) => {
  res.render("client-views/teachers-view.hbs")
})



// GET ("/client/calendar") => pagina calendario con las clases 
router.get("/calendar", isLoggedIn, async (req, res, next)=> {

  
try {
  
const calendarDetails = await Calendar.findById("64d797df1365c0b4f43508c2")

// const classDetails = await Class.find().populate("teacher")


let populateMonday = await calendarDetails.monday.populate("at9 at12 at15 at18")
let populateTuesday= await calendarDetails.tuesday.populate("at9 at12 at15 at18")
let populateWednesday = await calendarDetails.wednesday.populate("at9 at12 at15 at18")
let populateThrusday = await calendarDetails.thursday.populate("at9 at12 at15 at18")
let populateFriday = await calendarDetails.friday.populate("at9 at12 at15 at18")


//console.log(classDetails)
//console.log(calendarDetails.monday.at9[0])

// TODO PROFESORES------------------------------------------------------------------------------------------

//LUNES
//console.log(classProffesorMondayAt9)

const classProfessorMondayAt9 = await Class.findById(calendarDetails.monday.at9[0]._id).populate("teacher")
let professorMondayAt9 = classProfessorMondayAt9.teacher
const classProfessorMondayAt12 = await Class.findById(calendarDetails.monday.at12[0]._id).populate("teacher")
let professorMondayAt12 = classProfessorMondayAt12.teacher
const classProfessorMondayAt15 = await Class.findById(calendarDetails.monday.at15[0]._id).populate("teacher")
let professorMondayAt15 = classProfessorMondayAt15.teacher
const classProfessorMondayAt18 = await Class.findById(calendarDetails.monday.at18[0]._id).populate("teacher")
let professorMondayAt18 = classProfessorMondayAt18.teacher


// MARTES

const classProfessorTuesdayAt9 = await Class.findById(calendarDetails.tuesday.at9[0]._id).populate("teacher")
let professorTuesdayAt9 = classProfessorTuesdayAt9.teacher
const classProfessorTuesdayAt12 = await Class.findById(calendarDetails.tuesday.at12[0]._id).populate("teacher")
let professorTuesdayAt12 = classProfessorTuesdayAt12.teacher
const classProfessorTuesdayAt15 = await Class.findById(calendarDetails.tuesday.at15[0]._id).populate("teacher")
let professorTuesdayAt15 = classProfessorTuesdayAt15.teacher
const classProfessorTuesdayAt18 = await Class.findById(calendarDetails.tuesday.at18[0]._id).populate("teacher")
let professorTuesdayAt18 = classProfessorTuesdayAt18.teacher

// MIERCOLES

const classProfessorWednesdayAt9 = await Class.findById(calendarDetails.wednesday.at9[0]._id).populate("teacher")
let professorWednesdayAt9 = classProfessorWednesdayAt9.teacher
const classProfessorWednesdayAt12 = await Class.findById(calendarDetails.wednesday.at12[0]._id).populate("teacher")
let professorWednesdayAt12 = classProfessorWednesdayAt12.teacher
const classProfessorWednesdayAt15 = await Class.findById(calendarDetails.wednesday.at15[0]._id).populate("teacher")
let professorWednesdayAt15 = classProfessorWednesdayAt15.teacher
const classProfessorWednesdayAt18 = await Class.findById(calendarDetails.wednesday.at18[0]._id).populate("teacher")
let professorWednesdayAt18 = classProfessorWednesdayAt18.teacher

// JUEVES

const classProfessorThursdayAt9 = await Class.findById(calendarDetails.thursday.at9[0]._id).populate("teacher")
let professorThursdayAt9 = classProfessorThursdayAt9.teacher
const classProfessorThursdayAt12 = await Class.findById(calendarDetails.thursday.at12[0]._id).populate("teacher")
let professorThursdayAt12 = classProfessorThursdayAt12.teacher
const classProfessorThursdayAt15 = await Class.findById(calendarDetails.thursday.at15[0]._id).populate("teacher")
let professorThursdayAt15 = classProfessorThursdayAt15.teacher
const classProfessorThursdayAt18 = await Class.findById(calendarDetails.thursday.at18[0]._id).populate("teacher")
let professorThursdayAt18 = classProfessorThursdayAt18.teacher

// VIERNES

const classProfessorFridayAt9 = await Class.findById(calendarDetails.friday.at9[0]._id).populate("teacher")
let professorFridayAt9 = classProfessorFridayAt9.teacher
const classProfessorFridayAt12 = await Class.findById(calendarDetails.friday.at12[0]._id).populate("teacher")
let professorFridayAt12 = classProfessorFridayAt12.teacher
const classProfessorFridayAt15 = await Class.findById(calendarDetails.friday.at15[0]._id).populate("teacher")
let professorFridayAt15 = classProfessorFridayAt15.teacher
const classProfessorFridayAt18 = await Class.findById(calendarDetails.friday.at18[0]._id).populate("teacher")
let professorFridayAt18 = classProfessorFridayAt18.teacher

// todo --------------------------------------------------------------------------------------


//? PLAZAS VACANTES

// LUNES

let vacanciesMondayAt9 = calendarDetails.monday.at9[0].capacity
let vacanciesMondayAt12 = calendarDetails.monday.at12[0].capacity 
let vacanciesMondayAt15 = calendarDetails.monday.at15[0].capacity 
let vacanciesMondayAt18 = calendarDetails.monday.at18[0].capacity 

// MARTES

let vacanciesTuesdayAt9 = calendarDetails.tuesday.at9[0].capacity 
let vacanciesTuesdayAt12 = calendarDetails.tuesday.at12[0].capacity 
let vacanciesTuesdayAt15 = calendarDetails.tuesday.at15[0].capacity 
let vacanciesTuesdayAt18 = calendarDetails.tuesday.at18[0].capacity 
// MIERCOLES

let vacanciesWednesdayAt9 = calendarDetails.wednesday.at9[0].capacity 
let vacanciesWednesdayAt12 = calendarDetails.wednesday.at12[0].capacity 
let vacanciesWednesdayAt15 = calendarDetails.wednesday.at15[0].capacity 
let vacanciesWednesdayAt18 = calendarDetails.wednesday.at18[0].capacity 

// JUEVES

let vacanciesThursdayAt9 = calendarDetails.thursday.at9[0].capacity 
let vacanciesThursdayAt12 = calendarDetails.thursday.at12[0].capacity 
let vacanciesThursdayAt15 = calendarDetails.thursday.at15[0].capacity 
let vacanciesThursdayAt18 = calendarDetails.thursday.at18[0].capacity 

// VIERNES

let vacanciesFridayAt9 = calendarDetails.friday.at9[0].capacity 
let vacanciesFridayAt12 = calendarDetails.friday.at12[0].capacity 
let vacanciesFridayAt15 = calendarDetails.friday.at15[0].capacity 
let vacanciesFridayAt18 = calendarDetails.friday.at18[0].capacity 

//?----------------------------------------------------------------------------------------------------------------------

res.render("client-views/calendar-view.hbs", {
  
  calendarDetails,

  //PROFESORES
//----
professorMondayAt9,
professorMondayAt12,
professorMondayAt15,
professorMondayAt18,
//----
professorTuesdayAt9,
professorTuesdayAt12,
professorTuesdayAt15,
professorTuesdayAt18,
//----
professorWednesdayAt9,
professorWednesdayAt12,
professorWednesdayAt15,
professorWednesdayAt18,
//----
professorThursdayAt9,
professorThursdayAt12,
professorThursdayAt15,
professorThursdayAt18,
//----
professorFridayAt9,
professorFridayAt12,
professorFridayAt15,
professorFridayAt18,

// VACANTES
  
vacanciesMondayAt9,
vacanciesMondayAt12,
vacanciesMondayAt15,
vacanciesMondayAt18,
//----
vacanciesTuesdayAt9,
vacanciesTuesdayAt12,
vacanciesTuesdayAt15,
vacanciesTuesdayAt18,
//----
vacanciesWednesdayAt9,
vacanciesWednesdayAt12,
vacanciesWednesdayAt15,
vacanciesWednesdayAt18,
//----
vacanciesThursdayAt9,
vacanciesThursdayAt12,
vacanciesThursdayAt15,
vacanciesThursdayAt18,
//----
vacanciesFridayAt9,
vacanciesFridayAt12,
vacanciesFridayAt15,
vacanciesFridayAt18,

})

} catch (error) {
  next(error)
}

})


// POST ("/client/calendar") => renderizar los datos del calendario y añadirlos a la DB
router.post("/calendar", isLoggedIn, async (req, res, next)=> {

try {
  const calendarDetails = await Calendar.findById("64d797df1365c0b4f43508c2")

  let populateMonday = await calendarDetails.monday.populate("at9")
 
  

  const clientSessionId =  req.session.loggedUser._id
//  console.log(clientSessionId + "ESTO QUIERO")

  const mondayClassAt9Id = calendarDetails.monday.at9[0]._id

  const mondayClassAt9 = await Class.findById(mondayClassAt9Id)
  console.log("ID DE CLASE " +mondayClassAt9)
  // function updateDB(id, capacity2) {

  //   await Class.findByIdAndUpdate(id, {
  //     capacity : capacity2 })

  // }

 
console.log("LSITA ESTUDIANTES" + mondayClassAt9.students)

if (mondayClassAt9.students.includes(clientSessionId)) {

  res.status(400).redirect("/client/calendar", {
    errorMessage: "Ya estas apuntado a esta clase"})
return
} else {

  mondayClassAt9.students.push(clientSessionId)  

}


console.log("LSITA ESTUDIANTES ACTUALIZADA" + mondayClassAt9.students)
let newStudentList = mondayClassAt9.students
console.log("ID DE CLASE ACTUAL" +mondayClassAt9)
//console.log("ARRAY DE ESTUDIANTES" + mondayClassAt9.students)

    let newCapacity = calendarDetails.monday.at9[0].capacity - newStudentList.length


  await Class.findByIdAndUpdate(mondayClassAt9Id, {

    students :newStudentList,
    capacity : newCapacity
   })



//   //!queremos comprobar si metiéndole a joinAClass los parámetros adecuados, el botón funciona
  //  function joinAClass(mondayClassAt9Id, clientSessionId) {

  //   let newCapacity = calendarDetails.monday.at9[0].capacity - 1
  //   mondayClassAt9Id.students.push(clientSessionId)  

  //   realizarCosa
  // }
  res.redirect("/client/calendar")
} catch (error) {
  next(error)
}

})



module.exports = router;
