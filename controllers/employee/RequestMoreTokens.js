const UsersCollection = require("../../models/Users");

const RequestMoreTokens = async (req, res) => {
  //this noOfMonthsExtra value can be from 1 to 12 (12 months)
  const { noOfMonthsExtra } = req.body;
  const { userId } = req.userObj;
  try {
    if (!noOfMonthsExtra) {
      return res
        .status(404)
        .send({ type: "error", msg: "No noOfMonthsExtra field is available" });
    }
    //check for user available
    const userFound = await UsersCollection.findById(userId);
    if (!userFound) {
      return res.status(404).send({ type: "error", msg: "No such user Found" });
    }
    //now user found,
    //so lets add this in "tokenRequestedMonths" and  "isTokensRequested" db fields
    userFound.isTokensRequested = true;
    userFound.tokenRequestedMonths = noOfMonthsExtra;
    //saving it in db
    await userFound.save();
    res.send({
      type: "success",
      msg: "Your request has been recorded...Admin will look into it soon",
    });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = RequestMoreTokens;
