const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");
const generateRanNum = require("../utils/generateRanNum.js");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
// const sgTransport = require("nodemailer-sendgrid-transport");
dotenv.config();

console.log(generateRanNum())
console.log('uuidv4',uuidv4())
// async..await is not allowed in global scope, must use a wrapper
  // create reusable transporter object using the default SMTP transport
  // const frontendurl = process.env.FRONTEND_URL;
  // console.log('frontend url',frontendurl)

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "tafaxtradapp@gmail.com",
      pass: "jpmr rzig dgcr rpqu",
    },
  });


  
  // transporter.sendMail(email, function(err, info){
  //     if (err ){
  //       console.log(err);
  //     }
  //     else {
  //       console.log('Message sent: ' + info.response);
  //     }
  // });

  transporter.verify((error, success) => {
    if(error) {
     console.log(error) 
    }else {
      console.log("ready for message");
      console.log(success);
    }
  })

  
  const sendverificationMail = (_id,username,emailCode,email,res) => {
      
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Confirm Your Email",
      html: `<html>
          <head>
          <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
          <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
          <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
          <style type='text/css'>
              body {
                  font-family: Tahoma;color: #545454;font-weight: 400;font-size: 14px;
              }
              .btn-c {
                  width: 100%;margin: 10px auto;text-align: center;cursor: pointer;
              }
              .btn-c a {
                  cursor: pointer !important;
              }
              .btn-c a button {
                  cursor: pointer !important;
              }
              span {
                text-transform: capitalize;
              }
              div {
                  color: #545454;font-size: 14px;font-family: Tahoma;
              }
              button {
                  background-color: #545454 !important;border: none;font-weight: bold;font-family: sans-serif;color: white;padding: 10px 30px;margin: 1rem auto;text-align: center;border-radius: 4px;cursor: pointer;
              }
              p {
                  color: #545454;font-size: 14px;font-family: Tahoma;width: 100%;
              }
              p a {
                  font-weight: bold;color: #e2d7d7 !important;background-color: #1c1f2b;padding: 12px 38px;
                  font-family: Tahoma;font-size: 14px;margin: 2rem auto;text-align: center;border-radius: 4px;
              }
          </style>
          </head>
          <body>
            <div>
              <p>Hello <span> ${username},</span> you have signed up with TafaXtra. </p>
              <p>Confirm your email with the link below to have access to our platform <br/><br><br>
                <a href="https://tafabackend.onrender.com/api/users/activateaccount/${username}/${emailCode}/${uuidv4()}">Confirm Email</a>
              </p>
            </div>
          </body>
        </html>`,
    }
    
    const sender = transporter.sendMail(mailOptions);
    if(sender){
      console.log("Message sent: %s", sender.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sender));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      res.json({
        message: username,
      })
    }
  }

  const re_sendverificationMail = (_id,username,emailCode,email,res) => {
      
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Confirm Your Email",
      html: `<html>
          <head>
          <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
          <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
          <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
          <style type='text/css'>
              body {
                  font-family: Tahoma;color: #545454;font-weight: 400;font-size: 14px;
              }
              .btn-c {
                  width: 100%;margin: 10px auto;text-align: center;cursor: pointer;
              }
              .btn-c a {
                  cursor: pointer !important;
              }
              .btn-c a button {
                  cursor: pointer !important;
              }
              span {
                text-transform: capitalize;
              }
              div {
                  color: #545454;font-size: 14px;font-family: Tahoma;
              }
              button {
                  background-color: #545454 !important;border: none;font-weight: bold;font-family: sans-serif;color: white;padding: 10px 30px;margin: 1rem auto;text-align: center;border-radius: 4px;cursor: pointer;
              }
              p {
                  color: #545454;font-size: 14px;font-family: Tahoma;width: 100%;
              }
              p a {
                  font-weight: bold;color: #e2d7d7 !important;background-color: #1c1f2b;padding: 12px 38px;
                  font-family: Tahoma;font-size: 14px;margin: 2rem auto;text-align: center;border-radius: 4px;
              }
          </style>
          </head>
          <body>
            <div>
              <p>Hello <span> ${username},</span> you have signed up with TafaXtra. </p>
              <p>Confirm your email with the link below to have access to our platform <br/><br><br>
                <a href="https://tafabackend.onrender.com/api/users/activateaccount/${username}/${emailCode}/${uuidv4()}">Confirm Email</a>
              </p>
            </div>
          </body>
        </html>`,
    }
    
    const sender = transporter.sendMail(mailOptions);
    if(sender){
      console.log("Message sent: %s", sender.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sender));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      res.json({
        message: "Activation code email resend success",
      })
    }
  }


  const verificationSuccess = (username,email, res) => {
      
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Email Verificaton Success",
      html: `<html>
      <head>
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
      <style type='text/css'>
          body {
              font-family: Tahoma;color: #545454;font-weight: 400;font-size: 14px;
          }
          .btn-c {
              width: 100%;margin: 10px auto;text-align: center;cursor: pointer;
          }
          .btn-c a {
              cursor: pointer !important;
          }
          .btn-c a button {
              cursor: pointer !important;
          }
          span {
            text-transform: capitalize;
          }
          div {
              color: #545454;font-size: 14px;font-family: Tahoma;
          }
          button {
              background-color: #545454 !important;border: none;font-weight: bold;font-family: sans-serif;color: white;padding: 10px 30px;margin: 1rem auto;text-align: center;border-radius: 4px;cursor: pointer;
          }
          p {
              color: #545454;font-size: 14px;font-family: Tahoma;width: 100%;
          }
          p a {
              font-weight: bold;color: #e2d7d7 !important;background-color: #1c1f2b;padding: 12px 38px;
              font-family: Tahoma;font-size: 14px;margin: 2rem auto;text-align: center;border-radius: 4px;
          }
      </style>
      </head>
        <body>
          <div>
            <div>Hi <span>${username}</span>,</div><br>
            <div>You've successfully activated your account, you can now sign in.</div><br><br>
            <a href="https://tafafrontend.vercel.app/signin">Confirm Email</a>
            <br>
            <div>
                <p>
                  Best Regards,<br><br>TafaXtra
                </p>
            </div>
          </div>
        </body>
      </html>`,
    }
    
    const sender = transporter.sendMail(mailOptions);
    if(sender){
      console.log("Message sent: %s", sender.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      res.redirect(`https://tafafrontend.vercel.app/accountactivatestatus/${username}`)
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sender));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
  }
  

  const sendresetpasswordEmail = (username,email, res) => {
      
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Reset Password Success",
      html: `<html>
      <head>
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
      <style type='text/css'>
          body {
              font-family: Tahoma;color: #545454;font-weight: 400;font-size: 14px;
          }
          .btn-c {
              width: 100%;margin: 10px auto;text-align: center;cursor: pointer;
          }
          .btn-c a {
              cursor: pointer !important;
          }
          .btn-c a button {
              cursor: pointer !important;
          }
          span {
            text-transform: capitalize;
          }
          div {
              color: #545454;font-size: 14px;font-family: Tahoma;
          }
          button {
              background-color: #545454 !important;border: none;font-weight: bold;font-family: sans-serif;color: white;padding: 10px 30px;margin: 1rem auto;text-align: center;border-radius: 4px;cursor: pointer;
          }
          p {
              color: #545454;font-size: 14px;font-family: Tahoma;width: 100%;
          }
          p a {
              font-weight: bold;color: #e2d7d7 !important;background-color: #1c1f2b;padding: 12px 38px;
              font-family: Tahoma;font-size: 14px;margin: 2rem auto;text-align: center;border-radius: 4px;
          }
      </style>
      </head>
        <body>
          <div>
            <div>Hi <span>${username}</span>,</div><br>
            <div>You've successfully reset your success</div>
            <br>
            <div>
                <p>
                  Best Regards,<br>TafaXtra
                </p>
            </div>
          </div>
        </body>
      </html>`,
    }
    
    const sender = transporter.sendMail(mailOptions);
    if(sender){
      console.log("Message sent: %s", sender.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      res.json({
        message:"success"
      })
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sender));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
  }


//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  
  if (user && (await user.matchPassword(password))) {
    // get user id
    const userid = user._id;
    //check if user has a referral
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      usertype: user.userType,
      status: user.status,
      PBU: user.PBU,
      upline: user.upline,
      uplineUserType: user.uplineUserType,
      agentCommission: user.agentCommission,
      userCommission: user.userCommission,
      phonenumber: user.phonenumber,
      activated: user.activated,
      pic: user.pic,
      token: generateToken(user._id)
    });
   
    
  } else {
    res.json({
      message: "Invalid Email or Password",
    });
    throw new Error("Invalid Email or Password");
  }
});


const getDownlines = asyncHandler(async (req, res) => {
  const { uname } = req.body;
  const user = await User.find({ "username":uname });
  console.log('u ser',user)
  if(user) {
      // get user id
      const userid = user._id;

      const downlines = await User.find({"upline": uname});
      //check if user has a referral
      res.status(201).json({
        downlines: downlines
      });

  }
    
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { 
    username,
    userType,
    email,
    phonenumber,
    PBU,
    upline,
    uplineUserType,
    userCommission,
    agentCommission,
    tpin,
    status,
    password,
    timezone,
    userreferrence,
    pic
  } = req.body;

  // console.log('u det',req.body)
  const userExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });
  
  if (usernameExists) {
    res.status(404);
    throw new Error("Username already exists");
  }
  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    userType,
    phonenumber,
    PBU,
    upline,
    uplineUserType,
    userCommission,
    agentCommission,
    userreferrence,
    timezone,
    tpin,
    status,
    emailcode: generateRanNum(),
    pic
  });

  if (user) {

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      usertype: user.userType,
      status: user.status,
      PBU: user.PBU,
      upline: user.upline,
      uplineUserType: user.uplineUserType,
      agentCommission: user.agentCommission,
      userCommission: user.userCommission,
      phonenumber: user.phonenumber,
      activated: user.activated,
      pic: user.pic,
    })

    // if(verifystatus === false) {
    //   // sendverificationMail(_id,username,emailCode,email,res);
      
    // }
    
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});


// const addAssets = asyncHandler(async (req, res) => {
//   const { 
//     amount,
//     assetdailyprofitratio,
//     assettype,
//     userId,
//     status,
//     totalwithdrawals,
//     shortassetaddress,
//     assetaddress,
//     dailyprofit,
//     minassetduration,
//     profitamount,
//     assetaddtime 
//   } = req.body;

  
//   const asset = await Assets.create({
//     amount,
//     assetdailyprofitratio,
//     assettype,
//     userId,
//     status,
//     totalwithdrawals,
//     shortassetaddress,
//     assetaddress,
//     dailyprofit,
//     minassetduration,
//     profitamount,
//     assetaddtime
//   });

//   if (asset) {
 
//     res.status(201).json({
//        amount: asset.amount,
//        assetdailyprofitratio: asset.assetdailyprofitratio,
//        shortaddress: asset.shortassetaddress,
//        assetaddress: asset.assetaddress,
//        assettype: asset.assettype,
//        userid: asset.userId,
//        status: asset.status,
//        dailyprofit: asset.dailyprofit,
//        minassetduration: asset.minassetduration,
//        profitamount: asset.profitamount,
//        assetaddress
//     });
//   } else {
//     res.status(400);
//     throw new Error("User not found");
//   }
// });


// const assetDetails = asyncHandler(async (req, res) => {
//   const { 
//     userid
//   } = req.body;
//   const asset = await Assets.find({ userId: userid });
//   if (asset) {
//     res.status(201).json({
//        asset
//     });
//   } else {
//     res.status(400);
//     throw new Error("User not found");
//   }
// });


// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


const updateTransactionPin = asyncHandler(async (req, res) => {
  const userid = req.body.userid;
  const user = await User.findById(userid);
  if (user) {
    user.tpin = req.body.tpin;
    
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      tpin: updatedUser.tpin,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


const resetPassword = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({email});
    if (user) {
      user.password = req.body.newpassword;
      
      const updatedUser = await user.save();
      const username = updatedUser.username;
      sendresetpasswordEmail(username,email,res)
      
    } else {
      res.json({
        message: "user not found"
      });
      throw new Error("User Not Found");
    }
});


const activateAccount = asyncHandler(async (req, res) => {
  const username = req.params.username;
  const email__code = req.params.emailcode;
  
  const activateAcc = await User.findOne({username});

  if (activateAcc) {
    
    activateAcc.verified = true;
    
    const activAcc = await activateAcc.save();
    const email = activAcc.email;
    const email_code = activateAcc.emailcode;
    if(email_code == email__code) {
      const activatedAcc = await User.updateOne(
        {username:username}, { $set: {status: "Active"}});

      if(activatedAcc) {
        verificationSuccess(username, email, res);
      }
    }
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
});


const verifyUser = asyncHandler(async (req, res) => {
  const verifyuser = await User.findById(req.user._id);

  if (verifyuser) {
    verifyuser.verified = true;
    
    const verifiedUser = await verifyuser.save();
    const _id = verifiedUser._id;
    const username = verifiedUser.username;
    const email = verifiedUser.email;

      verificationSuccess(username, email, res);
      res.json({
        _id: verifiedUser._id,
        username: verifiedUser.username,
        email: verifiedUser.email,
        pic: verifiedUser.pic,
        isAdmin: verifiedUser.isAdmin,
        token: generateToken(verifiedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
});

const checkUserName = asyncHandler(async (req, res) => {
  const {username} = req.body
  
  const verifyusername = await User.findOne({username});

  if (verifyusername) {
    verifyusername.verified = true;
      res.json({
        message: username + " already exits, choose another"
      });
    } else {
      res.json({
        message: username + " is ok"
      });
    }
});

const checkEmail = asyncHandler(async (req, res) => {
  const {email} = req.body;
  const verifyemail = await User.findOne({email});

  if (verifyemail) {
      res.json({
        message: email + " already eExists, choose another",
      });
    } else {
      res.json({
        message: email + " is ok",
      });
    }
});

const checkForgotEmail = asyncHandler(async (req, res) => {
  const {email} = req.body;
  const verifyemail = await User.findOne({email});

  if (verifyemail) {
      res.json({
        message: email + " found, enter new password",
      });
    } else {
      res.json({
        message: "Email not found, enter correct email",
      });
    }
});


const resendverificationMail = asyncHandler(async (req, res) => {
  const {username} = req.body;
  const resendmailuser = await User.findOne({username});
  
  if (resendmailuser) {
    if(resendmailuser.verified === false) {
    
        const _id = resendmailuser._id;
        const username = resendmailuser.username;
        const emailCode = resendmailuser.emailcode;
        const email = resendmailuser.email;

        re_sendverificationMail(_id,username,emailCode,email,res);

      }else {
        res.json({
          _id: resendmailuser._id,
          username: resendmailuser.username,
          email: resendmailuser.email,
          pic: resendmailuser.pic,
          isAdmin: resendmailuser.isAdmin,
          token: generateToken(resendmailuser._id),
        });
      }
  } else {
    res.json({
      message: "User not found"
    });
    throw new Error("User Not Found");
  }
});

module.exports = {getDownlines, activateAccount,checkEmail, checkForgotEmail,checkUserName, authUser, updateUserProfile, registerUser, verifyUser, resendverificationMail, resetPassword, updateTransactionPin };
