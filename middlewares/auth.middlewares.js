function isLoggedIn (req, res, next) {
if (req.session.loggedUser === undefined) {
    res.redirect("/auth/login")
} else {
    next()
}
}

function isTeacher (req, res, next) {
if (req.session.loggedUser.role === "teacher"){
    next()
} else {
    res.redirect("/auth/login")
}
}

function isAdmin (req, res, next) {
    if (req.session.loggedUser.role === "admin"){
        next()
    } else {
        res.redirect("/auth/login")
    }

}

function updateLocals(req, res, next) {

    if (req.session.loggedUser === undefined) {
      // creo una variable local que indique que no está logeado
      res.locals.isUserActive = false;
    } else {
      // creo una variable local que indique que si está logeado
      res.locals.isUserActive = true;
    }
  
    next() // despues de actualizar la variable, continua con las rutas
  }


module.exports = {
    isLoggedIn,
    isTeacher,
    isAdmin,
    updateLocals
}