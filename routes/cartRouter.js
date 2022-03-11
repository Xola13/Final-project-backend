require('dotenv').config();

const express = require("express");
const router = express.Router();
// const auth = require("../middleware/authorise")
// const { getProduct } = require("../middleware/functions");
// const Product = require('../models/product');
const Cart = require("../models/cart")

const { authenticationToken, authenticationTokenAndAuthorization, authenticationTokenAndAdmin } = require("../middleware/authorise");

// CREATE

router.post('/', authenticationToken, async (req, res, next) => {
  const newCart = new Cart(req.body);
  
  try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
  } catch (error) {
      res.status(500).json(err);
  }
});

// GET ALL

router.get('/', authenticationTokenAndAdmin , async (req, res, next)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(err);
    }
});

//GET USER CART

router.get('/find/:id', authenticationTokenAndAuthorization, async (req, res, next) => {
    
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(err)
    }
});


//DELETE

router.delete('/:id', authenticationTokenAndAuthorization , async (req, res, next) => {
    
try {
    await Cart.findByIdAndDelete(req.params.id);
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


// router.post("/:id/cart", [auth, getProduct], async (req, res, next) => {
   

//     const user = await User.findById(req.user[0]._id);

//     let product_id = res.product._id;
//     let title = res.product.title;
//     let categories = res.product.categories;
//     let img = res.product.img;
//     let price = res.product.price;
//     let created_by = req.user[0]._id;
//     let quantity 
//     if(req.body.quantity) quantity = await req.body.quantity 
//     else quantity = await res.product.quantity 
    
    
  
//     try {
      
//       user.cart.push({
//         product_id,
//         title,
//         categories,
//         img,
//         price,
//         quantity,
//         created_by,
//       });
//       const updatedUser = await user.save();
//       if(updatedUser) {
//         console.log(updatedUser)
//         try {
//             const accessToken = jwt.sign(JSON.stringify(updatedUser), process.env.ACCESS_TOKEN_SECRET)
//             console.log({msg: 'Token has been created'})
//             res.json({ jwt: accessToken })
//             console.log({msg: 'Successfully added to your cart!'})

//         }catch (err) {
//             res.status(500).send({ msg: err.message })
//         }
//     }  
  
//       res.status(201).json(updatedUser);
//     } catch (error) {
//       res.status(500).json(console.log(error));
//     }
//   });

// // GET USER CART
// router.get("/:id/cart", [auth, getProduct], (req,res) => {

// })

// //updates the items in the users cart
// router.put("/:id/cart", [auth, getProduct], async (req, res, next) => {
//     const user = await User.findById(req.user[0]._id);
//     const inCart = user.cart.some(prod => prod.product_id == req.params.id);
//     console.log(inCart)
//     if (inCart) {
//         const product = user.cart.find(prod => prod.product_id == req.params.id)
//         product.qty = req.body.qty;
//         const updatedUser = await user.save();
//         console.log(updatedUser)
//         try {
//         res.status(201).json(updatedUser.cart);
//         } catch (error) {
//         res.status(500).json(console.log(error));
//         }
//       }
  
// });

//   // DELETE THE USER CART
//   router.delete("/:id/cart", [auth, getProduct], async (req, res, next) => {
//     const user = await User.findById(req.user[0]._id);
//     const inCart = user.cart.some(prod => prod.product_id == req.params.id);
//     console.log(inCart)
   
//     user.remove(inCart)
//     try{
//         inCart.remove()
//         res.json({ msg: '1 product deleted'})
//     }catch (err) {
//         res.status(500).json({ msg: err.message})
//     }
   
//   });

module.exports = router;