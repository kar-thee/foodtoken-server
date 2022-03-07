const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors({ origin: "*" }));

const connectDbFunc = require("./db/connectDb");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({ msg: "Welcome" });
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
