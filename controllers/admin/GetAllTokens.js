const TokensCollection = require("../../models/Tokens");

const GetAllTokensController = async (req, res) => {
  try {
    //fetch all tokens and populate user(field) that token belongs to (w/o pwd)
    const tokensFound = await TokensCollection.find({}).populate(
      "user",
      "-password"
    );
    if (!tokensFound || tokensFound.length < 1) {
      return res.status(404).send({ msg: "no tokens Found", type: "error" });
    }
    //send all users Array
    res.send({ type: "success", tokensFound });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = GetAllTokensController;
