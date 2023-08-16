const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");
const Week = require("../models/Week.model.js");

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");



//TODO: RUTAS ADMIN
//GET ("/admin/main") =>  página principal del admin
router.get("/main" , isLoggedIn, isAdmin, (req, res, next) => {
    res.render("admin-views/admin-main.hbs")
})

//weekId Eve: 64da46b6f1fd57abc7f34356
//weekId Lucas: 64da35b47a1247b56b3042b4

//GET ("/admin/edit-calendar") => muestra el formulario de edición del calendario
router.get("/edit-calendar", isLoggedIn, isAdmin, async (req, res, next) => {
    
    try {
    
        const weekDetails = await Week.findById(
            "64da46b6f1fd57abc7f34356"
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
    
          const allClasses = await Class.find().select({className: 1, weekDay: 1})
          const allTeachers = await User.find({role : {$in: "teacher"}})
    //console.log(allClasses)
   // console.log(allTeachers)
    const cloneAllClasses = JSON.parse( JSON.stringify(allClasses) )
    const cloneallTeachers = JSON.parse( JSON.stringify(allTeachers) )


    const mondayClasses = []
    const tuesdayClasses = []
    const wednesdayClasses = []
    const thursdayClasses = []
    const fridayClasses = []
    
    cloneAllClasses.forEach((cadaClase) => {
        console.log(cadaClase.weekDay)
        if (cadaClase.weekDay === "lunes") {
           mondayClasses.push(cadaClase)
        } else if (cadaClase.weekDay === "martes") {
            tuesdayClasses.push(cadaClase)
        } else if (cadaClase.weekDay === "miercoles") {
            wednesdayClasses.push(cadaClase)
        } else if (cadaClase.weekDay === "jueves") {
            thursdayClasses.push(cadaClase)
        } else if (cadaClase.weekDay === "viernes") {
            fridayClasses.push(cadaClase)
        } 
        })
    
        // console.log(mondayClasses)

    res.render("admin-views/admin-edit-calendar.hbs", {
        weekDetails,
        mondayClasses,
        tuesdayClasses,
        wednesdayClasses,
        thursdayClasses,
        fridayClasses,
        teachers: cloneallTeachers
        
    })
    } catch (error) {
        next(error)
    }

})

//POST ("/admin/edit-calendar") => renderiza la información y la edita

router.post("/edit-calendar", isLoggedIn, isAdmin, async (req, res, next) => {
    
const 
{mondayAt9, mondayAt9Teacher, 
mondayAt12, mondayAt12Teacher,
mondayAt15, mondayAt15Teacher,
mondayAt18, mondayAt18Teacher,
tuesdayAt9, tuesdayAt9Teacher,
tuesdayAt12, tuesdayAt12Teacher,
tuesdayAt15, tuesdayAt15Teacher,
tuesdayAt18, tuesdayAt18Teacher,
wednesdayAt9, wednesdayAt9Teacher,
wednesdayAt12, wednesdayAt12Teacher,
wednesdayAt15, wednesdayAt15Teacher,
wednesdayAt18, wednesdayAt18Teacher,
thursdayAt9, thursdayAt9Teacher,
thursdayAt12, thursdayAt12Teacher,
thursdayAt15, thursdayAt15Teacher,
thursdayAt18, thursdayAt18Teacher,
fridayAt9, fridayAt9Teacher,
fridayAt12, fridayAt12Teacher,
fridayAt15, fridayAt15Teacher,
fridayAt18, fridayAt18Teacher,
} = req.body

try {
    
await Week.findByIdAndUpdate("64da46b6f1fd57abc7f34356", {

monday: {at9:mondayAt9,at12:mondayAt12, at15:mondayAt15, at18: mondayAt18 }






})


res.redirect("/admin/edit-calendar")
} catch (error) {
    next(error)
}

})




//GET ("/admin/class-list") => Mostrar una lista de todas las clases de la semana
router.get("/class-list", isLoggedIn, isAdmin, async (req, res, next) => {

    try {
        
        const weekDetails = await Week.findById(
            "64da46b6f1fd57abc7f34356"
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

         res.render("admin-views/admin-class-list.hbs", {
            weekDetails
         })
    } catch (error) {
        next(error)
    }

})




module.exports = router;