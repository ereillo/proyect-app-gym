const express = require('express');
const router = express.Router();

const { updateLocals } = require("../middlewares/auth.middlewares.js")
router.use(updateLocals)
/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

const clientRouter = require("./client.routes.js")
router.use("/client", clientRouter)

const teacherRouter = require("./teachers.routes.js")
router.use("/teachers", teacherRouter)

const adminRouter = require("./admin.routes.js")
router.use("/admin", adminRouter)

module.exports = router;
