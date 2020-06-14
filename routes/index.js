const express = require("express");
const axios = require('axios');
const router = express.Router();

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
  const token = "youraccesstokensecret";
  const callBackUrl = `http://localhost:4001/success`;

 res.render("payment-submit", {
   title: "Payment submit",
   orderId,
   amount,
   token: "youraccesstokensecret",
   callBackUrl: "http://localhost:4001/success",
   userName: "john",
   userPassword: "password123admin",
 });

 // axios.post(loginBankUrl, dataToPost)
 // .then((result) => {
 //   const { status } = result.data;
 //   if(status === 'ok'){
 //       res.render("payment-submit", {
 //         title: "Payment submit",
 //         orderId,
 //         token,
 //         callBackUrl,
 //         amount,
 //       });
 //   }
 // })
 // .catch((err) => {
 //   console.log("error: ", err);
 // })
});

router.post("/success", function (req, res, next) {
   const {
     saleOrderId,
     saleReferenceId,
     refId,
     resCode,
   } = req.body;
  if(resCode === "0"){
    res.render("payment-success", {
      title: "Thank you!",
      result: {
        saleOrderId,
        saleReferenceId,
        refId,
        resCode,
      }
    });
  }
  if(resCode === "17"){
    res.redirect('/failed');
  }
});

router.get("/failed", function (req, res, next) {
  res.render("payment-failed", { title: "Sorry!" });
});

module.exports = router;
