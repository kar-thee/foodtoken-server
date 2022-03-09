const TokensCollection = require("../../models/Tokens");
const UsersCollection = require("../../models/Users");

const GetUserTokensController = async (req, res) => {
  const { userId } = req.userObj;
  try {
    //check if user available
    const userFound = await UsersCollection.findById(userId);
    if (!userFound) {
      return res
        .status(404)
        .send({ type: "error", msg: "No such user available" });
    }

    //fetch all user's tokens
    const userTokens = await TokensCollection.find({ user: userId });

    res.send({ type: "success", msg: "All tokens fetched", userTokens });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = GetUserTokensController;
