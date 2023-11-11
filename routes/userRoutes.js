const express = require("express");
const {
  authUser,
  registerUser,
  resendverificationMail,
  updateUserProfile,
  verifyUser,
  updateTransactionPin,
  resetPassword,
  checkEmail,
  checkUserName,
  activateAccount,
  checkForgotEmail,
  getDownlines,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyUser);
router.get("/activateaccount/:username/:emailcode/:uuid", activateAccount);
router.post("/checkemail", checkEmail);
router.post("/checkforgotemail", checkForgotEmail);
router.post("/downlines", getDownlines);
router.post("/checkusername", checkUserName);
router.post("/resendverifyemail", resendverificationMail);
router.post("/resetpassword", resetPassword);
router.post("/updatetransactionpin", updateTransactionPin);
router.post("/signin", authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
