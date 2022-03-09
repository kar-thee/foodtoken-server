const UsersCollection = require("../../models/Users");
const mailerFunc = require("../../util/mailerFunc");

const AuthorizeUserController = async (req, res) => {
  const { userId, noOfMonthsFoodAccess } = req.body;
  //noOfMonthsFoodAccess -will give no.of months meals needed
  try {
    if (!userId || !noOfMonthsFoodAccess) {
      return res
        .status(404)
        .send({ type: "error", msg: "No userId-params available" });
    }
    const userFound = await UsersCollection.findById(userId, "-password");
    if (!userFound) {
      return res
        .status(404)
        .send({ type: "error", msg: "No such user available" });
    }
    //below updating document

    //if userFound-now change isVerified [field] to true
    userFound.isVerified = true;

    //this we set 31 per month meal tokens  and 62 beverage tokens per month
    const mealsPerMonth = 31; //this is standardMax Limit for every employees
    const beveragesPerMonth = 62; //this is standardMax Limit for every employees

    //setMaxtokens for the user both meal and beverage tokens
    let maxMeals = noOfMonthsFoodAccess * mealsPerMonth; //1 month-31,2 months-62 etc...
    let maxBeverages = noOfMonthsFoodAccess * beveragesPerMonth; //1 month-62,2 months-124 etc...
    //saving it in usersCollection doc
    userFound.mealTokensMax = maxMeals;
    userFound.beverageTokensMax = maxBeverages;

    //save data
    await userFound.save();

    //now send that user email indicating that his account got verified
    // and you can generate token now
    const mailOptions = {
      toAddress: userFound.email,
      mailSubject: "Account Verified Successfully",
      mailHtml: `<div style="border:"1px solid orange">
      <p><h2>Hi <mark>${userFound.name}</mark></h2>, <h3>employee id - ${userFound.employeeId}</h3>, Your account got verified successfully</p>
      <h4>You can now generate food tokens... <a href="${process.env.FRONTEND_DOMAIN}"></a></h4>
      <h5>You are given ${maxMeals} mealTokens and ${maxBeverages} beverageTokens</h5>
      <h6>Happy Meals</h6>
      </div>`,
    };
    //send mail
    await mailerFunc(mailOptions);
    //send response
    res.send({
      type: "success",
      msg: "User Verified and sent verification mail to that user",
    });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = AuthorizeUserController;
