const { v4: uuid } = require("uuid");
const TokensCollection = require("../../models/Tokens");
const UsersCollection = require("../../models/Users");

const GenerateTokenController = async (req, res) => {
  const { tokenType } = req.body;
  const { userId } = req.userObj;
  try {
    //appending to uuid- if meal "M" or beverage "B" to identify token
    const tokenString = `${tokenType[0].toUpperCase()}-${uuid()}`;

    //verify user exists
    const userFound = await UsersCollection.findById(userId);
    if (!userFound) {
      return res
        .status(404)
        .send({ type: "error", msg: "no such user available" });
    }

    //1 mealToken and 2 beverageToken max count/limit -
    //cant generate more than the limit -checking it here
    //tokensCreatedToday ->find tokens generated with current Date in db
    const tokensCreatedToday = await TokensCollection.find({
      createdDate: new Date().toISOString().split("T")[0],
    });
    //if limit reached (1 meal,2 beverage)tokens -total count 3
    if (tokensCreatedToday.length === 3) {
      return res.status(403).send({
        type: "error",
        msg: "Sorry Buddy,Tokens generated to the Maximum Limit Today, try again Tomorrow",
      });
    }

    //check for meal and beverage type tokens below
    //mealType token
    if (tokenType === "meal") {
      //finding if mealToken present in the tokensCreatedToday
      const mealTokenFoundToday = tokensCreatedToday.find(
        (tokenObj) => tokenObj.tokenType === "meal"
      );
      //max-limit for mealToken is 1
      //if mealTokenFoundToday obj found -return you cant generate new meal token
      if (mealTokenFoundToday) {
        return res.status(403).send({
          type: "error",
          msg: "Sorry Buddy,Meal-Token generated to the Maximum Limit Today, try again Tomorrow",
        });
      }
    }
    //beverageType token
    if (tokenType === "beverage") {
      //filtering  beverage token type objects from tokensCreatedToday
      const beverageTokensFoundToday = tokensCreatedToday.filter(
        (tokenObj) => tokenObj.tokenType === "beverage"
      );
      //max-limit for beverageToken is 2
      //so, if beverageTokensFoundToday.length > 1 then say you cant generate token
      if (beverageTokensFoundToday.length > 1) {
        return res.status(403).send({
          type: "error",
          msg: "Sorry Buddy,Beverage-Token generated to the Maximum Limit Today, try again Tomorrow",
        });
      }
    }

    //create token here -finally
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
      tokenString,
    });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = GenerateTokenController;
