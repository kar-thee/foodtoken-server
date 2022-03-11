const verifyTokenController = require("../controllers/canteen/verifyToken");

const router = require("express").Router();

//used to verify a token ->then mark it as redeemed-> provide meal to customer
router.post("/verifyToken", verifyTokenController);

//maybe update meals available -> later
module.exports = router;
