const UsersCollection = require("../../models/Users");
const { decryptPwd } = require("../../util/cryptFunc");
const { signToken } = require("../../util/jwtFunc");

const SigninController = async (req, res) => {
  const { email, password } = req.body;

  try {
    //check whetehr user with email exists
    const userFound = await UsersCollection.findOne({ email });
    if (!userFound) {
      return res
        .status(400)
        .send({ type: "error", msg: "No User Found....check credentials" });
    }
    //check pwd matches or not
    const passwordMatch = await decryptPwd(password, userFound.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .send({ type: "error", msg: "No User Found....check credentials" });
    }
    //userFound,now send jwt
    const payload = {
      name: userFound.name,
      email,
      employeeId: userFound.employeeId,
      userRole: userFound.userRole,
      userId: userFound._id,
      accountVerified: userFound.isVerified,
    };
    const tokenGenerated = signToken(payload);
    //send token + data to client
    res.send({
      msg: `Welcome ${userFound.name}`,
      type: "success",
      tokenGenerated,
      userData: payload,
    });
  } catch (err) {
    res.status(500).send({ msg: err.message, type: "error" });
  }
};

module.exports = SigninController;
