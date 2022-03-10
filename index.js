const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors({ origin: "*" }));

//dbIntegrationFunction
const connectDbFunc = require("./db/connectDb");

//authCheck is to verify jwtToken and a userObj (object) in request Object and next()
const authCheck = require("./middleware/authCheck");

//adminCheck and canteenCheck checks the role(admin/canteen) in req.userObj
const adminCheck = require("./middleware/adminCheck");
const canteenCheck = require("./middleware/canteenCheck");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const canteenRoutes = require("./routes/canteenRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", authCheck, adminCheck, adminRoutes);
app.use("/api/canteen", authCheck, canteenCheck, canteenRoutes);
app.use("/api/employee", authCheck, employeeRoutes);

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to FoodTokenApp-server" });
});

connectDbFunc()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log(err.message, " err in index.js");
  });
