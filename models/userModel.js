const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "referrals"
    },
    password: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: false
    },
    PBU: {
      type: Number,
      required: true
    },
    upline: {
      type: String,
      required: false
    },
    uplineUserType: {
      type: String,
      required: false
    },
    usercommission: {
      type: Number,
      required: false
    },
    agentcommission: {
      type: Number,
      required: false
    },
    userreferrence: {
      type: String,
      required: false
    },
    tpin: {
      type: Number,
      required: true,
      default: 1234
    },
    verified: {
      type: Boolean,
      required: false,
      default: false
    },
    status: {
      type: String,
      required: false
    },
    emailcode: {
      type: Number,
      required: false
    },
    activated: {
      type: Boolean,
      default: false
    },
    timezone: {
      type: String,
      required: false
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("users", userSchema);

module.exports = User;
