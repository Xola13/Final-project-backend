require('dotenv').config();

const express = require("express");
const router = express.Router();
// const auth = require("../middleware/authorise")
// const { getProduct } = require("../middleware/functions");
// const Product = require('../models/product');
const Cart = require("../models/cart");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { authenticationToken, authenticationTokenAndAuthorization, authenticationTokenAndAdmin } = require("../middleware/authorise");
const user = require('../models/user');
const { getProduct } = require('../middleware/functions');



// GET ALL

router.get('/', authenticationTokenAndAuthorization , async (req, res, next)=>{
    try {
        const cart = await Cart.find({ userId: {$regex: req.user._id } });
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(err);
    }
});

//DELETE ALL
router.delete('/', authenticationTokenAndAuthorization , async(req, res, next) => {
try{
    const cart = await Cart.deleteMany({ userId: {$regex: req.user._id} });
    res.status(200).json("Deleted");
 } catch (err) {
     res.status(500).json(err)
 } 
})


//DELETE ONE

router.delete('/:id', authenticationTokenAndAuthorization , async (req, res, next) => {
    
try {
  const cart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted..");
} catch (error) {
    res.status(500).json(err);
}
});

//UPDATE

router.put('/:id', authenticationTokenAndAuthorization , async (req, res, next) => {
    
  try {
      const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
              $set: req.body,
          },
          { new: true }
      );
      res.status(200).json(updatedCart);
  } catch (error) {
      res.status(500).json(err);
  }
});

//ADD items to cart

router.post('/:id', [authenticationTokenAndAuthorization, getProduct], async (req, res, next) => {
    const user = await user.findById(req.user.userId);
    const cart = await Cart.find({"user_id": {$regex : req.user_id}});


    let product_id = res.product._id;
    let title = res.product.title;
    let category = res.product.category;
    let img = res.product.img;
    let quantity = res.body;
    let price = res.product.price;
    let userId = res.userId;
    
    const carts = new Cart({

        product_id,
        title,
        category,
        quantity,
        price,
        img,
        userId,
    })
    try {
        carts.cart.push({
            product_id,
            title,
            category,
            price,
            img,
            quantity,
        });
        const updatedCart = await carts.save();
        res.status(201).json(updatedCart);
    }catch (err) {
        res.status(500).json(console.log(err));
    }
});




module.exports = router;