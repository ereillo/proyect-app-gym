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
router.get("/main", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("admin-views/admin-main.hbs");
});

//weekId Eve: 64da46b6f1fd57abc7f34356
//weekId Lucas: 64da35b47a1247b56b3042b4

//GET ("/admin/edit-calendar") => muestra el formulario de edición del calendario
router.get("/edit-calendar", isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const weekDetails = await Week.findById(
      "64dc95976b6542feadca9bc7"
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

    const allClasses = await Class.find().select({ className: 1, weekDay: 1 });
    const allTeachers = await User.find({ role: { $in: "teacher" } });
    //console.log(allClasses)
    // console.log(allTeachers)
    const cloneAllClasses = JSON.parse(JSON.stringify(allClasses));
    const cloneallTeachers = JSON.parse(JSON.stringify(allTeachers));
    
    cloneAllClasses.forEach((cadaClase) => {

    if (weekDetails.monday.at9.toString() === cadaClase._id.toString()) {
      cadaClase.isSelected = true
    }
    })






    const mondayClasses = [];
    const tuesdayClasses = [];
    const wednesdayClasses = [];
    const thursdayClasses = [];
    const fridayClasses = [];

    cloneAllClasses.forEach((cadaClase) => {
      console.log(cadaClase.weekDay);
      if (cadaClase.weekDay === "lunes") {
        mondayClasses.push(cadaClase);
      } else if (cadaClase.weekDay === "martes") {
        tuesdayClasses.push(cadaClase);
      } else if (cadaClase.weekDay === "miercoles") {
        wednesdayClasses.push(cadaClase);
      } else if (cadaClase.weekDay === "jueves") {
        thursdayClasses.push(cadaClase);
      } else if (cadaClase.weekDay === "viernes") {
        fridayClasses.push(cadaClase);
      }
    });

    // console.log(mondayClasses)

    res.render("admin-views/admin-edit-calendar.hbs", {
      weekDetails,
      mondayClasses,
      tuesdayClasses,
      wednesdayClasses,
      thursdayClasses,
      fridayClasses,
      teachers: cloneallTeachers,
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
    Week.findByIdAndUpdate("64dc95976b6542feadca9bc7", {
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
    const weekDetails = await Week.findById(
      "64dc95976b6542feadca9bc7"
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
      weekDetails,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
