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

//GET ("/admin/edit-calendar") => muestra el formulario de edición del calendario
router.get("/edit-calendar", isLoggedIn, isAdmin, async (req, res, next) => {
    
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
    

        console.log(mondayClasses)
    
    res.render("admin-views/admin-edit-calendar.hbs", {
        weekDetails,
        mondayClasses,
        tuesdayClasses,
        wednesdayClasses,
        thursdayClasses,
        fridayClasses
        
    })
    } catch (error) {
        next(error)
    }

})

//POST ("/admin/edit-calendar") => renderiza la información y la edita

router.post("/edit-calendar", isLoggedIn, isAdmin, async (req, res, next) => {
    


})









module.exports = router;