const TokensCollection = require("../../models/Tokens");

const verifyTokenController = async (req, res) => {
  const { tokenFromRequest } = req.body;
  try {
    if (!tokenFromRequest) {
      return res
        .status(404)
        .send({ type: "error", msg: "No tokenString present in request" });
    }
    //search for that particular token with tokenRedeemed(field)status to be false
    //tokenRedeemed - it is for to identify whether token used already or not
    //createdAt - also checking if token generated today or old token but not redeemed
    const tokenFound = await TokensCollection.findOne({
      tokenString: tokenFromRequest,
      tokenRedeemed: false,
      createdDate: new Date().toISOString().split("T")[0],
    });
    if (!tokenFound) {
      return res
        .status(400)
        .send({ type: "error", msg: "No such tokenString available with us" });
    }
    //if token found,then change tokenRedeemed as true,
    //and tell canteen user that valid token,provide meal
    tokenFound.tokenRedeemed = true;
    await tokenFound.save();

    res.send({
      type: "success",
      msg: `User verified...You can serve him ${tokenFound.tokenType}`,
      serving: tokenFound.tokenType,
    });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = verifyTokenController;
