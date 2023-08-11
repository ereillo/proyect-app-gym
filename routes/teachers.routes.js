const express = require("express");
const router = express.Router();

//TODO: importación de modelos
const User = require("../models/User.model.js");
const Class = require("../models/Class.model.js");

const { isLoggedIn, isTeacher } = require("../middlewares/auth.middlewares.js");


//TODO: RUTAS TEACHERS
//GET ("/teachers/main") = página principal del profesor
router.get("/main", isLoggedIn, isTeacher, async (req, res, next) => {

  try {
    const teacherId = await User.
    findById(req.session.loggedUser._id)
    .select({
        name: 1
    })
    
    const classInfo = await Class.find({teacher: {$in: req.session.loggedUser._id} }).select({className: 1, weekDay: 1})
    res.render("teachers-views/teachers-main.hbs", {
        classInfo,
        teacher: teacherId
    })
  } catch (error) {
     next(error)
  }



})




module.exports = router;
