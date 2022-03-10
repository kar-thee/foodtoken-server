const ChangePwdController = require("../controllers/employee/ChangePwdController");
const GenerateTokenController = require("../controllers/employee/GenerateToken");
const GetUserProfileController = require("../controllers/employee/GetUserProfile");
const GetUserTokensController = require("../controllers/employee/GetUserTokens");

const router = require("express").Router();

//generateTokens
router.post("/generateToken", GenerateTokenController);

//userProfile
router.get("/profile/:userId", GetUserProfileController);

//get all his/her tokens
router.get("/myTokens", GetUserTokensController);

//update PWd
router.put("/changePwd", ChangePwdController);

module.exports = router;
