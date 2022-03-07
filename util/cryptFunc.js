const bcrypt = require("bcrypt");

const encryptPwd = async (plainPwd) => {
  const hashedPwd = await bcrypt.hash(plainPwd, 12);
  return hashedPwd;
};

const decryptPwd = async (userTypedPwd, PwdFromDb) => {
  const isPwdValid = await bcrypt.compare(userTypedPwd, PwdFromDb);
  return isPwdValid ? true : false;
};

module.exports = { encryptPwd, decryptPwd };
