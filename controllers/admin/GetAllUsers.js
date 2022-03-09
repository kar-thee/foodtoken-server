const UsersCollection = require("../../models/Users");

const GetAllUsersController = async (req, res) => {
  try {
    //fetch all users projection- w/o pwd
    const usersFound = await UsersCollection.find({}, "-password");
    if (!usersFound || usersFound.length < 1) {
      return res.status(404).send({ msg: "no users Found", type: "error" });
    }
    //send all users Array
    res.send({ type: "success", usersFound });
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = GetAllUsersController;
