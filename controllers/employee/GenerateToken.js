const { v4: uuid } = require("uuid");
const TokensCollection = require("../../models/Tokens");
const UsersCollection = require("../../models/Users");

const GenerateTokenController = async (req, res) => {
  const { tokenType } = req.body;
  const { userId } = req.userObj;
  try {
    //appending to uuid- if meal "M" or beverage "B" to identify token
    const tokenString = `${tokenType[0].toUpperString()}-${uuid()}`;

    //verify user exists
    const userFound = await UsersCollection.findById(userId);
    if (!userFound) {
      return res
        .status(404)
        .send({ type: "error", msg: "no such user available" });
    }

    //create token here
    const tokenCreated = await TokensCollection.create({
      user: userId,
      tokenType,
      tokenString,
    });
    if (!tokenCreated) {
      return res
        .status(401)
        .send({ type: "error", msg: "couldnot create Food-Token" });
    }

    //created token ,so add tokenGeneratedCount(meal or beverage) in usersCollection doc
    userFound[`${tokenType}TokensGenerated`] += 1;
    await userFound.save();

    res.send({
      type: "success",
      msg: `Token generated successfully, enjoy your ${tokenType}`,
    });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = GenerateTokenController;
