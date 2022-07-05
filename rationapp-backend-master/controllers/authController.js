const User = require("../models/user");
const Stock = require("../models/stock");
const Admin = require("../models/admin-model");
const Complaint = require("../models/complaint");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const sendMail = require("../mail");
const cors = require("cors");
const { response } = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "", message: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "Incorrect email";
    errors.message = "Authentication Failed";
  }
  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "Incorrect password";
    errors.message = "Authentication Failed";
  }

  //duplicate error code

  //validation errors
  // if(err.message.includes('user validation failed')){
  //     Object.values(err.errors).forEach(({properties}) =>{
  //         errors[properties.path] = properties.message;
  //     });
  // }

  return errors;
};
const maxAge = 3 * 60 * 60 * 24;

module.exports.register_post = async (req, res) => {
  const {
    firstname,
    lastname,
    mobileno,
    email,
    username,
    dob,
    gender,
    password,
    rationUser,
  } = req.body;
  let token;
  try {
    const emailTaken = await User.findOne({ email });
    if (emailTaken)
      return res.status(400).json({ err: "This Email is already in use!" });
    const user = await User.create({
      firstname,
      lastname,
      mobileno,
      email,
      username,
      dob,
      gender,
      password,
      rationUser,
    });
    // token = user.generateAuthToken(user._id);
    // res.cookie('jwt', token,{httpOnly : true, maxAge : maxAge*1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  let token;
  try {
    const token = await User.login(email, password);
    // res.cookie('jwt', token, { httpOnly : true, maxAge : maxAge*1000});
    res.status(200).json({ token });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

module.exports.admin_panel_login_post = async (req, res) => {
  const { email, password } = req.body;
  let token;
  try {
    const token = await Admin.login(email, password);
    // res.cookie('jwt', token, { httpOnly : true, maxAge : maxAge*1000});
    res.status(200).json({ token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.admin_update_post = (req, res) => {
  const id = req.params.id;
  Admin.findById(id)
    .then((user) => {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.mobileno = req.body.mobileno;
      user.email = req.body.email;
      user.username = req.body.username;
      user.dob = Date.parse(req.body.dob);
      user.gender = req.body.gender;
      user.password = req.body.password;

      user
        .save()
        .then(() => res.json("Profile Details updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

module.exports.admin_get = (req, res) => {
  const id = req.params.id;
  Admin.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving user with id=" + id });
    });
};

module.exports.shopkeeper_get = (req, res) => {
  const id = req.params.id;
  // res.send(reqUser).json();
  // const {id} = req.params.username;
  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving user with id=" + id });
    });
};

module.exports.update_post = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.mobileno = req.body.mobileno;
      user.email = req.body.email;
      user.username = req.body.username;
      user.dob = req.body.dob;
      user.gender = req.body.gender;
      user.password = req.body.password;

      user
        .save()
        .then(() => res.json("Profile Details updated"))
        .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

module.exports.details_post = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error : " + err));
};

module.exports.user_delete = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error : " + err));
};

module.exports.admin_dashboard_users = (req, res) => {
  User.find()
    .then((users) => res.json({ users }))
    .catch((err) => res.status(400).json("Error : " + err));

  // Complaint.find()
  // .then(complaints => res.json(complaints))
  // .catch(err => res.status(400).json("Error : " + err));
  // res.end();
};
module.exports.admin_dashboard_complaints = (req, res) => {
  Complaint.find()
    .then((complaints) => res.json({ complaints }))
    .catch((err) => res.status(400).json("Error : " + err));
};

module.exports.stock_get = (req, res) => {
  Stock.find()
    .then((stocks) => res.json(stocks[stocks.length - 1]))
    .catch((err) => res.status(400).json("Error : " + err));
};
module.exports.stock_details = (req, res) => {
  Stock.find()
    .then((stocks) => res.json(stocks))
    .catch((err) => res.status(400).json("Error : " + err));
};

module.exports.rationUser_get = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving user with id=" + id });
    });
};

module.exports.rationUser_post = (req, res) => {
  // //     const id = req.params.id;
  // //     const objFriends = {
  // //         email: req.body.email,
  // //         name:req.body.name,
  // //         totalFamilyMembers:req.body.totalFamilyMembers,
  // //         rationType:req.body.rationType,
  // //         status:req.body.status
  // //     };
  // //     User.findOneAndUpdate(
  // //    { _id: req.params.id },
  // //    { $push: { rationUser: objFriends  } },
  // //     function (error, success) {
  // //         if (error) {
  // //             console.log(error);
  // //         } else {
  // //             console.log(success);
  // //             res.json({success});
  // //         }
  // //     })
};

module.exports.complaint_post = async (req, res) => {
  const { email, shopkeepername, title, query } = req.body;

  const subject = "Notify : Complaint Submitted Successfully";
  const text =
    "<p><h3>Dear Ration Card Holder,</h3><br>Your Complaint against <b>" +
    shopkeepername +
    "</b> about <u>" +
    title +
    "</u> is submitted successfully. We will review your complaint and immediately take respective action. <br>Thank You.</p>";

  try {
    const complaint = await Complaint.create({
      email,
      shopkeepername,
      title,
      query,
    });
    res.status(201).json({ complaint: complaint._id });
    sendMail(email, subject, text, function (err, data) {
      if (err) {
        res.status(500).json({ message: "Internal Error" });
      } else {
        res.json({ message: "EMAIL sent !" });
      }
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors: "Check your gmail" });
  }
};

module.exports.shopkeepername_get = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error : " + err));
};

module.exports.complaint_get = (req, res) => {
  Complaint.find()
    .then((complaints) => res.json(complaints))
    .catch((err) => res.status(400).json("Error : " + err));
};

// module.exports.test = (req, res) => {
//   console.log(req.params.id);
//   let isRationExist = false;
//   const rationNo = "abc123456789";
//   User.findOne({ _id: req.params.id }, (error, success) => {
//     if (error) {
//       console.log("error");
//     } else {
//       console.log(success);
//       for (const rationUser of success.rationUser) {
//         isRationExist = rationUser.rationNo === rationNo;

//         if (!isRationExist) break;

//         console.log("user", rationUser);
//         console.log("isRationExist", isRationExist);
//       }
//     }
//   });

//   res.json({ msg: "SUCCESS" });
// };

module.exports.rationUser_add_post = async (req, res) => {
  const id = req.params.id;
  const objFriends = {
    name: req.body.name,
    email: req.body.email,
    totalFamilyMembers: req.body.totalFamilyMembers,
    rationType: req.body.rationType,
    rationNo: req.body.rationNo,
  };
  var isRationExist = false;

  await User.findOne({ _id: req.params.id }, (error, success) => {
    if (error) {
      console.log("error");
    } else {
    //   console.log(success);
      for (const rationUser of success.rationUser) {
        isRationExist = rationUser.rationNo === objFriends.rationNo;
        if (isRationExist) break;
      }
    }
  });

  if (isRationExist){
      res.status(500).json({ message: "Ration number exists." });
      const text = "Ration User Already Exist"+res.status;
      return;
    }
    
  const subject = "Welcome to The Ration Corruption Control System";
  const text =
    "<p><h3>Dear" +
    " " +
    objFriends.name +
    ",</h3><br> You are assigned as Ration Card Holder in Ration Corruption Control System. <br>You have ration type " +
    objFriends.rationType +
    " color and total family members are " +
    objFriends.totalFamilyMembers +
    ".</p>";

 !isRationExist &&  User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        rationUser: objFriends,
      },
    },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
        sendMail(objFriends.email, subject, text, function (err, data) {
          if (err) {
            res.status(500).json({ message: "Internal Error" });
          } else {
            res.json({ message: "EMAIL sent !" });
          }
        });
        res.json({ success });
      }
    }
  );
};

module.exports.admin_supply_stock = async (req, res) => {
  const supply = {
    monthyear: req.body.monthyear,
    riceTotalStock: req.body.riceTotalStock,
    riceSoldStock: req.body.riceSoldStock,
    riceAvailableStock: req.body.riceAvailableStock,
    sugarTotalStock: req.body.sugarTotalStock,
    sugarSoldStock: req.body.sugarSoldStock,
    sugarAvailableStock: req.body.sugarAvailableStock,
    wheatTotalStock: req.body.wheatTotalStock,
    wheatSoldStock: req.body.wheatSoldStock,
    wheatAvailableStock: req.body.wheatAvailableStock,
    oilTotalStock: req.body.oilTotalStock,
    oilSoldStock: req.body.oilSoldStock,
    oilAvailableStock: req.body.oilAvailableStock,
    dalTotalStock: req.body.dalTotalStock,
    dalSoldStock: req.body.dalSoldStock,
    dalAvailableStock: req.body.dalAvailableStock,
  };

  const subject = "Notify : Ration Stock Allocated";
  const text =
    "<p><h3>Dear Ration Card Holder,</h3><br> The Ration Stock for the month of <h4>" +
    supply.monthyear +
    "</h4> is allocated.<br>Please visit to your Ration shopkeeper to get your ration. If you found any improper activity while taking ration from the shopkeeper, please feel free to register complaint in Ration Corruption Control System.<br> Visit here : https://rationapp.netlify.app/complaint </p>";
  const email = "nikibhole64@gmail.com";

  console.log(supply);
  try {
    const stock = await Stock.create(supply);
    res.status(201).json({ stock: stock._id });
    sendMail(email, subject, text, function (err, data) {
      if (err) {
        res.status(500).json({ message: "Internal Error" });
      } else {
        res.json({ message: "EMAIL sent !" });
      }
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.stock_update_post = async (req, res) => {
  const id = req.params.id;
  const riceTotalPrice = req.body.riceTotalPrice;
  const sugarTotalPrice = req.body.sugarTotalPrice;
  const wheatTotalPrice = req.body.wheatTotalPrice;
  const dalTotalPrice = req.body.dalTotalPrice;
  const oilTotalPrice = req.body.oilTotalPrice;
  const rationUserEmail = req.body.rationUserEmail;
  const totalRice = req.body.totalRice;
  const totalSugar = req.body.totalSugar;
  const totalWheat = req.body.totalWheat;
  const totalOil = req.body.totalOil;
  const totalDal = req.body.totalDal;
  const total =
    riceTotalPrice +
    sugarTotalPrice +
    wheatTotalPrice +
    dalTotalPrice +
    oilTotalPrice;

  const subject = "Notify : Ration Stock Received";
  const text =
    "<p><h3>Dear Ration Card Holder,</h3><br> You have Received The Ration Stock for the month of <b>" +
    req.body.monthyear +
    "</b>. Please check below mentioned table and verify your ration. Just cross check your ration and their price should be as same as given in the table.<br>If you found any improper activity while taking ration from the shopkeeper, please feel free to register complaint in Ration Corruption Control System.<br> Visit here : </p><br><table cellspacing=0 border=1><tr><th>Sr.no</th><th>Product name</th><th>Allocated Ration (kg/ltr)</th><th>Total Price</th></tr><tr><td>1</td><td>Rice</td><td>" +
    totalRice +
    "</td><td>₹ " +
    riceTotalPrice +
    "</td></tr><tr><td>2</td><td>Sugar</td><td>" +
    totalSugar +
    "</td><td>₹ " +
    sugarTotalPrice +
    "</td></tr><tr><td>3</td><td>Wheat</td><td>" +
    totalWheat +
    "</td><td>₹ " +
    wheatTotalPrice +
    "</td></tr><tr><td>4</td><td>Dal</td><td>" +
    totalDal +
    "</td><td>₹ " +
    dalTotalPrice +
    "</td></tr><tr><td>5</td><td>Oil</td><td>" +
    totalOil +
    "</td><td>₹ " +
    oilTotalPrice +
    "</td></tr><tr><td></td><td></td><td></td><td>Total = ₹ " +
    total +
    "</td></tr></table>";
  const email = rationUserEmail;

  Stock.findById(id)
    .then((stock) => {
      (stock.monthyear = req.body.monthyear),
        (stock.riceTotalStock = req.body.riceTotalStock),
        (stock.riceSoldStock = req.body.riceSoldStock),
        (stock.riceAvailableStock = req.body.riceAvailableStock),
        (stock.sugarTotalStock = req.body.sugarTotalStock),
        (stock.sugarSoldStock = req.body.sugarSoldStock),
        (stock.sugarAvailableStock = req.body.sugarAvailableStock),
        (stock.wheatTotalStock = req.body.wheatTotalStock),
        (stock.wheatSoldStock = req.body.wheatSoldStock),
        (stock.wheatAvailableStock = req.body.wheatAvailableStock),
        (stock.oilTotalStock = req.body.oilTotalStock),
        (stock.oilSoldStock = req.body.oilSoldStock),
        (stock.oilAvailableStock = req.body.oilAvailableStock),
        (stock.dalTotalStock = req.body.dalTotalStock),
        (stock.dalSoldStock = req.body.dalSoldStock),
        (stock.dalAvailableStock = req.body.dalAvailableStock),
        stock
          .save()
          .then(
            () => res.json("Stock Details updated"),
            sendMail(email, subject, text, function (err, data) {
              if (err) {
                res.status(500).json({ message: "Internal Error" });
              } else {
                res.json({ message: "EMAIL sent !" });
              }
            })
          )
          .catch((err) => res.status(400).json("Error :" + err));
    })
    .catch((err) => res.status(400).json("Error : " + err));
};

module.exports.forgot_password = (req, res) => {
  const { emailformail } = req.body;
  console.log(emailformail);
  try {
    User.findOne({ email: emailformail })
      .then((data) => {
        res.json("User found");
        const secret = "some secret codes" + data.password;
        const payload = {
          email: data.email,
          id: data._id,
        };
        const token = jwt.sign(payload, secret, { expiresIn: "15m" });
        const link = `http://localhost:5000/reset-password/${data._id}/${token}`;
        console.log(link);

        const subject =
          "Password Reset Link : Ration Corruption Control System";
        const text =
          "<p><h3>Dear " +
          data.username +
          ",</h3><br>The password reset link : " +
          link +
          " <br><ul><li>Link is only valid for next 15 min.</li><li>This is One Time password reset link</li></ul></p>";

        sendMail(emailformail, subject, text, function (err, data) {
          if (err) {
            res.status(500).json({ message: "Internal Error" });
          } else {
            res.json({ message: "EMAIL sent !" });
          }
        });
      })
      .catch((err) => {
        res.status(400).json("Error : " + err);
      });
  } catch (err) {
    res.status(400).json("Error : " + err);
  }
};

module.exports.reset_password_post = async (req, res) => {
  const id = req.params.id;

  const reuser = {
    password: req.body.password,
  };

  const salt = await bcrypt.genSalt(12);
  const hashp = await bcrypt.hash(reuser.password, salt);
  console.log(reuser.password + " " + hashp);
  console.log(reuser);
  let query = { _id: id };
  let update = { $set: { password: hashp } };
  let options = { new: true, returnNewDocument: true };

  if (mongoose.Types.ObjectId.isValid(id)) {
    User.findOneAndUpdate(query, update, options, function (error, success) {
      if (error) {
        console.log(error);
      } else {
        res.send("Successfully updated");
      }
    });
  }
};

module.exports.reset_password_get = (req, res) => {
  const id = req.params.id;
  console.log(id);
  const token = req.params.token;
  User.findById(id)
    .then((user) => {
      const secret = "some secret codes" + user.password;
      try {
        const payload = jwt.verify(token, secret);
        res.send("redirected");
      } catch (error) {
        console.log(error.message);
        res.status(400).json("Errrrr");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
