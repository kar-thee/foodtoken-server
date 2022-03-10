const router = require("express").Router();

const SigninController = require("../controllers/auth/SigninController");
const SignupController = require("../controllers/auth/SignupController");

router.post("/signup", SignupController);

router.post("/signin", SigninController);

module.exports = router;
