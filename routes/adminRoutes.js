const AuthorizeUserController = require("../controllers/admin/AuthorizeUser");
const GetAllNotVerifiedUsersController = require("../controllers/admin/GetAllNotVerifiedUsers");
const GetAllTokensController = require("../controllers/admin/GetAllTokens");
const GetAllUsersController = require("../controllers/admin/GetAllUsers");
const GetUserProfileController = require("../controllers/employee/GetUserProfile");

const router = require("express").Router();

//get all users
router.get("/allUsers", GetAllUsersController);

router.get("/allnotverifiedusers", GetAllNotVerifiedUsersController);

router.get("/profile/:userId", GetUserProfileController);

//verify a user to generate tokens
router.put("/authorizeUser", AuthorizeUserController);

//get all tokens
router.get("/allTokens", GetAllTokensController);

module.exports = router;
