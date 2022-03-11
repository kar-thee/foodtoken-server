const UsersCollection = require("../../models/Users");

const GetUserProfileController = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res
        .status(404)
        .send({ msg: "no userId Params present", type: "error" });
    }
    const userFound = await UsersCollection.findById(userId, "-password");
    if (!userFound) {
      return res
        .status(404)
        .send({ msg: "no such user present", type: "error" });
    }
    res.send({ type: "success", msg: "User fetched", userFound });
  } catch (err) {
    console.log(err, "err");
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = GetUserProfileController;
