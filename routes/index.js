var express = require("express");
const axios = require('axios');

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Go to checkout page" });
});

/* GET users listing. */
// router.get('/users/:id', function(req, res, next) {
//   const { id } = req.params;
//   res.render('users', { title: 'Users', id });
// });
/* GET users listing. */
router.get("/checkout/:orderId", function (req, res, next) {
  const { orderId } = req.params;
  res.render("checkout", { title: "Please pay this order", orderId });
});

router.post("/payment/submit/", function (req, res, next) {
  const { orderId, price } = req.body;
  // send request and redirect
  const bankUrl = 'http://localhost:4002/login'
  const token = 2575;
  const backLink = `http://localhost:4001/success`;

  var dataToPost = {
    "username": "john",
    "password": "password123admin",
	  "token": "youraccesstokensecret",
 };

 // let axiosConfiguration = {
 //   headers: {
 //       'Content-Type': 'application/json;charset=UTF-8',
 //       "Access-Control-Allow-Origin": "*",
 //   }
 // };

 axios.post(bankUrl, dataToPost)
 .then((result) => {
   const { status } = result.data;
   if(status === 'ok'){
       res.render("payment-submit", {
         title: "Payment submit",
         orderId,
         token,
         backLink,
         price,
       });
   }
 })
 .catch((err) => {
   console.log("error: ", err);
 })
});

router.post("/success", function (req, res, next) {
  const { orderId } = req.body;
  res.render("payment-success", { title: "Thank you!", orderId });
});

router.get("/failed", function (req, res, next) {
  res.render("payment-failed", { title: "Sorry!" });
});

module.exports = router;
