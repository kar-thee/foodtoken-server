const UsersCollection = require("../../models/Users");

const GetAllNotVerifiedUsers = async (req, res) => {
  try {
    //fetch all users projection- w/o pwd
    const usersFound = await UsersCollection.find(
      { userRole: "EMPLOYEE", isVerified: false },
      "-password"
    );
    if (!usersFound || usersFound.length < 1) {
      return res.status(404).send({
        msg: "no Not-Verified users Found",
        type: "error",
        usersFound: [],
      });
    }
    //send all users Array
    res.send({ type: "success", msg: "Users listed", usersFound });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = GetAllNotVerifiedUsers;
