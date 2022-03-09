const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "UsersCollection",
      required: true,
    },
    tokenString: {
      type: String,
      required: true,
    },
    tokenRedeemed: {
      type: Boolean,
      default: false,
    },
    tokenType: {
      type: String,
      required: true,
      //only 2 types of tokens
      enum: ["meal", "beverage"],
    },
  },
  { timeStamps: true }
);

const TokensCollection = mongoose.model(
  "TokenCollection",
  tokenSchema,
  "Tokens"
);

module.exports = TokensCollection;
