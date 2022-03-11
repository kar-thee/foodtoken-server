const UsersCollection = require("../../models/Users");
const { decryptPwd, encryptPwd } = require("../../util/cryptFunc");

const ChangePwdController = async (req, res) => {
  const { userId } = req.userObj;
  const { oldPwd, newPwd } = req.body;
  try {
    const userFound = await UsersCollection.findById(userId);
    if (!userFound) {
      return res
        .status(404)
        .send({ type: "error", msg: "No such user available" });
    }

    //checking if oldPwd same
    const isOldPwdMatch = await decryptPwd(oldPwd, userFound.password);
    if (!isOldPwdMatch) {
      return res.status(401).send({ type: "error", msg: "wrong password" });
    }
    //if oldPwdissame,encrypt newPwd
    const newEncryptedPwd = await encryptPwd(newPwd);

    //update PWD to db
    userFound.password = newEncryptedPwd;
    await userFound.save();

    res.send({ type: "success", msg: "Password changed successfully" });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};
module.exports = ChangePwdController;
