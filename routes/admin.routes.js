const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");
const Week = require("../models/Week.model.js");
const getWeekDetails = require("../utils/weekFunction.js")

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");

//weekId Eve: 64da46b6f1fd57abc7f34356
//weekId Lucas: 64da35b47a1247b56b3042b4

//TODO: RUTAS ADMIN
//GET ("/admin/main") =>  página principal del admin
router.get("/main", isLoggedIn, isAdmin, async (req, res, next) => {


  try {
  
    const userName = await User.findById(req.session.loggedUser._id).select({name:1})
    res.render("admin-views/admin-main.hbs", {
      userName
    });
} catch (error) {
  next(error)
}


});

//GET ("/admin/edit-calendar") => muestra el formulario de edición del calendario
router.get("/edit-calendar", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const weekDetails = await getWeekDetails()
    console.log(weekDetails)

    const allClasses = await Class.find().select({ className: 1, weekDay: 1 });
    const allTeachers = await User.find({ role: { $in: "teacher" } });
    //console.log(allClasses)
    // console.log(allTeachers)
    const cloneAllClasses = JSON.parse(JSON.stringify(allClasses));
    const cloneallTeachers = JSON.parse(JSON.stringify(allTeachers));


// todo  Arrays clases ---------------------------------------------------------

  const mondayClassAt9 =[]
  mondayClassAt9.push(weekDetails.monday.at9)
  mondayClassAt9[0].isSelected = true

  const mondayClassAt12 =[]
  mondayClassAt12.push(weekDetails.monday.at12)
  mondayClassAt12[0].isSelected = true

  const mondayClassAt15 =[]
  mondayClassAt15.push(weekDetails.monday.at15)
  mondayClassAt15[0].isSelected = true

   const mondayClassAt18 =[]
  mondayClassAt18.push(weekDetails.monday.at18)
  mondayClassAt18[0].isSelected = true
//--------------------------------------------------
  const tuesdayClassAt9 =[]
  tuesdayClassAt9.push(weekDetails.tuesday.at9)
  tuesdayClassAt9[0].isSelected = true

const tuesdayClassAt12 =[]
  tuesdayClassAt12.push(weekDetails.tuesday.at12)
  tuesdayClassAt12[0].isSelected = true

const tuesdayClassAt15 =[]
  tuesdayClassAt15.push(weekDetails.tuesday.at15)
  tuesdayClassAt15[0].isSelected = true

const tuesdayClassAt18 =[]
  tuesdayClassAt18.push(weekDetails.tuesday.at18)
  tuesdayClassAt18[0].isSelected = true
//--------------------------------------------------  
const wednesdayClassAt9 =[]
  wednesdayClassAt9.push(weekDetails.wednesday.at9)
  wednesdayClassAt9[0].isSelected = true

const wednesdayClassAt12 =[]
  wednesdayClassAt12.push(weekDetails.wednesday.at12)
  wednesdayClassAt12[0].isSelected = true

const wednesdayClassAt15 =[]
  wednesdayClassAt15.push(weekDetails.wednesday.at15)
  wednesdayClassAt15[0].isSelected = true

const wednesdayClassAt18 =[]
  wednesdayClassAt18.push(weekDetails.wednesday.at18)
  wednesdayClassAt18[0].isSelected = true
//--------------------------------------------------  
const thursdayClassAt9 =[]
  thursdayClassAt9.push(weekDetails.thursday.at9)
  thursdayClassAt9[0].isSelected = true

const thursdayClassAt12 =[]
  thursdayClassAt12.push(weekDetails.thursday.at12)
  thursdayClassAt12[0].isSelected = true

const thursdayClassAt15 =[]
  thursdayClassAt15.push(weekDetails.thursday.at15)
  thursdayClassAt15[0].isSelected = true

const thursdayClassAt18 =[]
  thursdayClassAt18.push(weekDetails.thursday.at18)
  thursdayClassAt18[0].isSelected = true
//--------------------------------------------------  
const fridayClassAt9 =[]
  fridayClassAt9.push(weekDetails.friday.at9)
  fridayClassAt9[0].isSelected = true

const fridayClassAt12 =[]
  fridayClassAt12.push(weekDetails.friday.at12)
  fridayClassAt12[0].isSelected = true

const fridayClassAt15 =[]
  fridayClassAt15.push(weekDetails.friday.at15)
  fridayClassAt15[0].isSelected = true

const fridayClassAt18 =[]
  fridayClassAt18.push(weekDetails.friday.at18)
  fridayClassAt18[0].isSelected = true
//--------------------------------------------------  

  cloneAllClasses.forEach((cadaClase) => {
      //console.log(cadaClase.weekDay);
      if (cadaClase.weekDay === "lunes") {
        mondayClassAt9.push(cadaClase);
        mondayClassAt12.push(cadaClase);
        mondayClassAt15.push(cadaClase);
        mondayClassAt18.push(cadaClase);
      } else if (cadaClase.weekDay === "martes") {
        tuesdayClassAt9.push(cadaClase);
        tuesdayClassAt12.push(cadaClase);
        tuesdayClassAt15.push(cadaClase);
        tuesdayClassAt18.push(cadaClase);
      } else if (cadaClase.weekDay === "miercoles") {
        wednesdayClassAt9.push(cadaClase);
        wednesdayClassAt12.push(cadaClase);
        wednesdayClassAt15.push(cadaClase);
        wednesdayClassAt18.push(cadaClase);
      } else if (cadaClase.weekDay === "jueves") {
        thursdayClassAt9.push(cadaClase);
        thursdayClassAt12.push(cadaClase);
        thursdayClassAt15.push(cadaClase);
        thursdayClassAt18.push(cadaClase);
      } else if (cadaClase.weekDay === "viernes") {
        fridayClassAt9.push(cadaClase);
        fridayClassAt12.push(cadaClase);
        fridayClassAt15.push(cadaClase);
        fridayClassAt18.push(cadaClase);
      }
    });

// todo --------------------------------------------------------------------------

//todo Arrays Profesores ---------------------------------------------------------

const mondayTeacherAt9 =[]
mondayTeacherAt9.push(weekDetails.monday.at9.teacher)
mondayTeacherAt9[0].isSelected = true

console.log(mondayTeacherAt9)
const mondayTeacherAt12 =[]
mondayTeacherAt12.push(weekDetails.monday.at12.teacher)
mondayTeacherAt12[0].isSelected = true

const mondayTeacherAt15 =[]
mondayTeacherAt15.push(weekDetails.monday.at15.teacher)
mondayTeacherAt15[0].isSelected = true

const mondayTeacherAt18 =[]
mondayTeacherAt18.push(weekDetails.monday.at18.teacher)
mondayTeacherAt18[0].isSelected = true
//--------------------------------------------------
const tuesdayTeacherAt9 =[]
tuesdayTeacherAt9.push(weekDetails.tuesday.at9.teacher)
tuesdayTeacherAt9[0].isSelected = true

const tuesdayTeacherAt12 =[]
tuesdayTeacherAt12.push(weekDetails.tuesday.at12.teacher)
tuesdayTeacherAt12[0].isSelected = true

const tuesdayTeacherAt15 =[]
tuesdayTeacherAt15.push(weekDetails.tuesday.at15.teacher)
tuesdayTeacherAt15[0].isSelected = true

const tuesdayTeacherAt18 =[]
tuesdayTeacherAt18.push(weekDetails.tuesday.at18.teacher)
tuesdayTeacherAt18[0].isSelected = true
const wednesdayTeacherAt9 =[]
wednesdayTeacherAt9.push(weekDetails.wednesday.at9.teacher)
wednesdayTeacherAt9[0].isSelected = true

const wednesdayTeacherAt12 =[]
wednesdayTeacherAt12.push(weekDetails.wednesday.at12.teacher)
wednesdayTeacherAt12[0].isSelected = true

const wednesdayTeacherAt15 =[]
wednesdayTeacherAt15.push(weekDetails.wednesday.at15.teacher)
wednesdayTeacherAt15[0].isSelected = true
const wednesdayTeacherAt18 =[]
wednesdayTeacherAt18.push(weekDetails.wednesday.at18.teacher)
wednesdayTeacherAt18[0].isSelected = true
const thursdayTeacherAt9 =[]
thursdayTeacherAt9.push(weekDetails.thursday.at9.teacher)
thursdayTeacherAt9[0].isSelected = true

const thursdayTeacherAt12 =[]
thursdayTeacherAt12.push(weekDetails.thursday.at12.teacher)
thursdayTeacherAt12[0].isSelected = true

const thursdayTeacherAt15 =[]
thursdayTeacherAt15.push(weekDetails.thursday.at15.teacher)
thursdayTeacherAt15[0].isSelected = true

const thursdayTeacherAt18 =[]
thursdayTeacherAt18.push(weekDetails.thursday.at18.teacher)
thursdayTeacherAt18[0].isSelected = true



const fridayTeacherAt9 =[]
fridayTeacherAt9.push(weekDetails.friday.at9.teacher)
fridayTeacherAt9[0].isSelected = true

const fridayTeacherAt12 =[]
fridayTeacherAt12.push(weekDetails.friday.at12.teacher)
fridayTeacherAt12[0].isSelected = true

const fridayTeacherAt15 =[]
fridayTeacherAt15.push(weekDetails.friday.at15.teacher)
fridayTeacherAt15[0].isSelected = true

const fridayTeacherAt18 =[]
fridayTeacherAt18.push(weekDetails.friday.at18.teacher)
fridayTeacherAt18[0].isSelected = true




cloneallTeachers.forEach((teacher)=> {
  mondayTeacherAt9.push(teacher)
  mondayTeacherAt12.push(teacher)
  mondayTeacherAt15.push(teacher)
  mondayTeacherAt18.push(teacher)

  tuesdayTeacherAt9.push(teacher)
  tuesdayTeacherAt12.push(teacher)
  tuesdayTeacherAt15.push(teacher)
  tuesdayTeacherAt18.push(teacher)

  wednesdayTeacherAt9.push(teacher)
  wednesdayTeacherAt12.push(teacher)
  wednesdayTeacherAt15.push(teacher)
  wednesdayTeacherAt18.push(teacher)

  thursdayTeacherAt9.push(teacher)
  thursdayTeacherAt12.push(teacher)
  thursdayTeacherAt15.push(teacher)
  thursdayTeacherAt18.push(teacher)

  fridayTeacherAt9.push(teacher)
  fridayTeacherAt12.push(teacher)
  fridayTeacherAt15.push(teacher)
  fridayTeacherAt18.push(teacher)

})

// todo -----------------------------------------------------

    // console.log(mondayClasses)

    res.render("admin-views/admin-edit-calendar.hbs", {

      mondayClassAt9,
      mondayClassAt12,
      mondayClassAt15,
      mondayClassAt18,
      
      tuesdayClassAt9,
      tuesdayClassAt12,
      tuesdayClassAt15,
      tuesdayClassAt18,

      wednesdayClassAt9,
      wednesdayClassAt12,
      wednesdayClassAt15,
      wednesdayClassAt18,

      thursdayClassAt9,
      thursdayClassAt12,
      thursdayClassAt15,
      thursdayClassAt18,

      fridayClassAt9,
      fridayClassAt12,
      fridayClassAt15,
      fridayClassAt18,
    
      mondayTeacherAt9,
      mondayTeacherAt12,
      mondayTeacherAt15,
      mondayTeacherAt18,

      tuesdayTeacherAt9,
      tuesdayTeacherAt12,
      tuesdayTeacherAt15,
      tuesdayTeacherAt18,

      wednesdayTeacherAt9,
      wednesdayTeacherAt12,
      wednesdayTeacherAt15,
      wednesdayTeacherAt18,

      thursdayTeacherAt9,
      thursdayTeacherAt12,
      thursdayTeacherAt15,
      thursdayTeacherAt18,

      fridayTeacherAt9,
      fridayTeacherAt12,
      fridayTeacherAt15,
      fridayTeacherAt18,
      
    });
  } catch (error) {
    next(error);
  }
});

//POST ("/admin/edit-calendar") => renderiza la información y la edita

router.post("/edit-calendar", isLoggedIn, isAdmin, async (req, res, next) => {
  const {
    mondayAt9,
    mondayAt9Teacher,
    mondayAt12,
    mondayAt12Teacher,
    mondayAt15,
    mondayAt15Teacher,
    mondayAt18,
    mondayAt18Teacher,
    tuesdayAt9,
    tuesdayAt9Teacher,
    tuesdayAt12,
    tuesdayAt12Teacher,
    tuesdayAt15,
    tuesdayAt15Teacher,
    tuesdayAt18,
    tuesdayAt18Teacher,
    wednesdayAt9,
    wednesdayAt9Teacher,
    wednesdayAt12,
    wednesdayAt12Teacher,
    wednesdayAt15,
    wednesdayAt15Teacher,
    wednesdayAt18,
    wednesdayAt18Teacher,
    thursdayAt9,
    thursdayAt9Teacher,
    thursdayAt12,
    thursdayAt12Teacher,
    thursdayAt15,
    thursdayAt15Teacher,
    thursdayAt18,
    thursdayAt18Teacher,
    fridayAt9,
    fridayAt9Teacher,
    fridayAt12,
    fridayAt12Teacher,
    fridayAt15,
    fridayAt15Teacher,
    fridayAt18,
    fridayAt18Teacher,
  } = req.body;

  let promisesList = [
    Class.findByIdAndUpdate(mondayAt9, {
      teacher: mondayAt9Teacher,
    }),
    Class.findByIdAndUpdate(mondayAt12, {
      teacher: mondayAt12Teacher,
    }),
    Class.findByIdAndUpdate(mondayAt15, {
      teacher: mondayAt15Teacher,
    }),
    Class.findByIdAndUpdate(mondayAt18, {
      teacher: mondayAt18Teacher,
    }),
    Class.findByIdAndUpdate(tuesdayAt9, {
      teacher: tuesdayAt9Teacher,
    }),
    Class.findByIdAndUpdate(tuesdayAt12, {
      teacher: tuesdayAt12Teacher,
    }),
    Class.findByIdAndUpdate(tuesdayAt15, {
      teacher: tuesdayAt15Teacher,
    }),
    Class.findByIdAndUpdate(tuesdayAt18, {
      teacher: tuesdayAt18Teacher,
    }),
    Class.findByIdAndUpdate(wednesdayAt9, {
      teacher: wednesdayAt9Teacher,
    }),
    Class.findByIdAndUpdate(wednesdayAt12, {
      teacher: wednesdayAt12Teacher,
    }),
    Class.findByIdAndUpdate(wednesdayAt15, {
      teacher: wednesdayAt15Teacher,
    }),
    Class.findByIdAndUpdate(wednesdayAt18, {
      teacher: wednesdayAt18Teacher,
    }),
    Class.findByIdAndUpdate(thursdayAt9, {
      teacher: thursdayAt9Teacher,
    }),
    Class.findByIdAndUpdate(thursdayAt12, {
      teacher: thursdayAt12Teacher,
    }),
    Class.findByIdAndUpdate(thursdayAt15, {
      teacher: thursdayAt15Teacher,
    }),
    Class.findByIdAndUpdate(thursdayAt18, {
      teacher: thursdayAt18Teacher,
    }),
    Class.findByIdAndUpdate(fridayAt9, {
      teacher: fridayAt9Teacher,
    }),
    Class.findByIdAndUpdate(fridayAt12, {
      teacher: fridayAt12Teacher,
    }),
    Class.findByIdAndUpdate(fridayAt15, {
      teacher: fridayAt15Teacher,
    }),
    Class.findByIdAndUpdate(fridayAt18, {
      teacher: fridayAt18Teacher,
    }),
    Week.findByIdAndUpdate("64da35b47a1247b56b3042b4", {
      monday: {
        at9: mondayAt9,
        at12: mondayAt12,
        at15: mondayAt15,
        at18: mondayAt18,
      },
      tuesday: {
        at9: tuesdayAt9,
        at12: tuesdayAt12,
        at15: tuesdayAt15,
        at18: tuesdayAt18,
      },
      wednesday: {
        at9: wednesdayAt9,
        at12: wednesdayAt12,
        at15: wednesdayAt15,
        at18: wednesdayAt18,
      },
      thursday: {
        at9: thursdayAt9,
        at12: thursdayAt12,
        at15: thursdayAt15,
        at18: thursdayAt18,
      },
      friday: {
        at9: fridayAt9,
        at12: fridayAt12,
        at15: fridayAt15,
        at18: fridayAt18,
      },
    }),
  ];

  try {
    Promise.all(promisesList);

    res.redirect("/admin/main");
  } catch (error) {
    next(error);
  }
});

//GET ("/admin/class-list") => Mostrar una lista de todas las clases de la semana
router.get("/class-list", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const weekDetails = await getWeekDetails()

    res.render("admin-views/admin-class-list.hbs", {
      weekDetails,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
