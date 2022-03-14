const AuthorizeUserController = require("../controllers/admin/AuthorizeUser");
const GetAllNotVerifiedUsersController = require("../controllers/admin/GetAllNotVerifiedUsers");
const GetAllTokensController = require("../controllers/admin/GetAllTokens");
const GetAllUsersController = require("../controllers/admin/GetAllUsers");
const GiveMoreTokensController = require("../controllers/admin/GiveMoreTokens");
const GetAllTokenRequestsController = require("../controllers/admin/GetAllTokenRequests");

const GetUserProfileController = require("../controllers/employee/GetUserProfile");

const router = require("express").Router();

//get all users
router.get("/allUsers", GetAllUsersController);

//get all not verified users -useful for authorizing later
router.get("/allnotverifiedusers", GetAllNotVerifiedUsersController);

//user profile
router.get("/profile/:userId", GetUserProfileController);

//verify a user to generate tokens
router.put("/authorizeUser", AuthorizeUserController);

//respond to user tokenRequests
router.put("/giveMoreTokens", GiveMoreTokensController);

//get all token requests
router.get("/alltokenRequests", GetAllTokenRequestsController);

//get all tokens
router.get("/allTokens", GetAllTokensController);

module.exports = router;
