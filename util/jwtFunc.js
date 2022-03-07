const jwt = require("jsonwebtoken");

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKENSECRET, {
    expiresIn: "10h",
  });
  return token;
};

const verifyToken = (tokenReceived) => {
  try {
    const decodedPayload = jwt.verify(tokenReceived, process.env.TOKENSECRET);
    return decodedPayload;
  } catch (err) {
    //return null if jwt token failed to verify
    return null;
  }
};

module.exports = { signToken, verifyToken };
