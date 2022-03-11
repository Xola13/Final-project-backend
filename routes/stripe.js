require('dotenv').config();

const router = express.Router();
const express = require('express')
const stripe = require('stripe')(process.env.PAYMENT_KEY);

router.post('/payment', (req, res, next)=>{
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "zar",
        },
        (stripeErr, stripeRes) => {
            if(stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );

});

module.exports = router;