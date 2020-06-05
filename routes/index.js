var express = require("express");
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
  const token = 2575;
  const backLink = `http://localhost:4001/success/${orderId}/${token}`;
  console.log({
    orderId,
    token,
    backLink,
    price,
  });
  res.render("payment-submit", {
    title: "Payment submit",
    orderId,
    token,
    backLink,
    price,
  });
});
router.get("/success/:orderId/:token", function (req, res, next) {
  const { orderId, token } = req.params;
  res.render("payment-success", { title: "Thank you!", orderId, token });
});

module.exports = router;
