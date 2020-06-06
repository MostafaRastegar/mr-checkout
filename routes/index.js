var express = require("express");
const axios = require('axios');

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Go to checkout page" });
});

/* GET users listing. */
router.get("/checkout/:orderId", function (req, res, next) {
  const { orderId } = req.params;
  res.render("checkout", { title: "Please pay this order", orderId });
});

router.post("/payment/submit/", function (req, res, next) {
  const { orderId, amount } = req.body;
  // send request and redirect
  const bankUrl = 'http://localhost:4002/login'
  const token = 2575;
  const callBackUrl = `http://localhost:4001/success`;

  var dataToPost = {
    "userName": "john",
    "userPassword": "password123admin",
	  "token": "youraccesstokensecret",
 };

 axios.post(bankUrl, dataToPost)
 .then((result) => {
   const { status } = result.data;
   if(status === 'ok'){
       res.render("payment-submit", {
         title: "Payment submit",
         orderId,
         token,
         callBackUrl,
         amount,
       });
   }
 })
 .catch((err) => {
   console.log("error: ", err);
 })
});

router.post("/success", function (req, res, next) {
  const { orderId, ResCode } = req.body;
  if(ResCode === "0"){
    res.render("payment-success", { title: "Thank you!", orderId });
  }
  if(ResCode === "17"){
    res.redirect('/failed');
  }
});

router.get("/failed", function (req, res, next) {
  res.render("payment-failed", { title: "Sorry!" });
});

module.exports = router;
