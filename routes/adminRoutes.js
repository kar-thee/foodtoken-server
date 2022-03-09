const AuthorizeUserController = require("../controllers/admin/AuthorizeUser");
const GetAllTokensController = require("../controllers/admin/GetAllTokens");
const GetAllUsersController = require("../controllers/admin/GetAllUsers");
const GetUserProfileController = require("../controllers/employee/GetUserProfile");

const router = require("express").Router();

//get all users
router.get("/allUsers", GetAllUsersController);

router.get("/profile/:userId", GetUserProfileController);

//verify a user to generate tokens
router.put("/authorize-user", AuthorizeUserController);

//get all tokens
router.get("/allTokens", GetAllTokensController);

module.exports = router;
