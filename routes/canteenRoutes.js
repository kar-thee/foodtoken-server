const router = require("express").Router();

//used to verify a token ->then mark it as redeemed-> provide meal to customer
router.put("/verifyToken/:tokenFromRequest");

//maybe update meals available -> later
module.exports = router;
