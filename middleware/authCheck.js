const { verifyToken } = require("../util/jwtFunc");

const authCheck = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    //check authorization header available
    if (!authorization) {
      return res
        .status(404)
        .send({ type: "error", msg: "No authorization header available" });
    }

    //check token available
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(404).send({ type: "error", msg: "No token available" });
    }

    //verify Token
    const payload = verifyToken(token);
    if (!payload) {
      return res
        .status(403)
        .send({ type: "error", msg: "token Tampered or expired" });
    }
    //if payload exists after verifying token
    //save it in req
    req.userObj = {
      name: payload.name,
      email: payload.email,
      employeeId: payload.employeeId,
      userRole: payload.userRole,
      userId: payload.userId,
    };
    //success so, proceed
    next();
  } catch (err) {
    return res.status(500).send({ type: "error", msg: err.message });
  }
};

module.exports = authCheck;
