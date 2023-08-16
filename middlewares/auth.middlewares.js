function isLoggedIn(req, res, next) {
  if (req.session.loggedUser === undefined) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}

function isClient(req, res, next) {
  if (req.session.loggedUser.role === "client") {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

function isTeacher(req, res, next) {
  if (req.session.loggedUser.role === "teacher") {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

function isAdmin(req, res, next) {
  if (req.session.loggedUser.role === "admin") {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

function updateLocals(req, res, next) {
  if (req.session.loggedUser === undefined) {
    // creo una variable local que indique que no está logeado

res.locals.isUserNotLoggedIn = true;
    res.locals.isUserClient = false;
    res.locals.isUserTeacher = false;
    res.locals.isUserAdmin = false;

  } else if (req.session.loggedUser.role === "client") {
    console.log("SESION" + req.session.loggedUser.role)
    res.locals.isUserClient = true;
    res.locals.isUserNotLoggedIn = false;

  } else if (req.session.loggedUser.role === "teacher") {
    res.locals.isUserTeacher = true;
    res.locals.isUserNotLoggedIn = false;

  } else if (req.session.loggedUser.role === "admin") {
    res.locals.isUserAdmin = true;
    res.locals.isUserNotLoggedIn = false;
  }
  next(); // despues de actualizar la variable, continua con las rutas
}

module.exports = {
  isLoggedIn,
  isClient,
  isTeacher,
  isAdmin,
  updateLocals,
};
