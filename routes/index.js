const express = require("express");
const router = express();
const passport = require("passport");
const authRouter = require('./api/AuthRoute');
const cardRouter = require('./api/CardRoute')

// Passport Middleware
router.use(passport.initialize());

// Passport Configuration
require("../config/passport")(passport);

//authentication
router.use("/", authRouter)

//card router
router.use("/card", passport.authenticate("jwt", {session: false}), cardRouter)

module.exports = router;
