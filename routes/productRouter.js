require('dotenv').config();

const express = require("express");
const router = express.Router();
// const auth = require("../middleware/authorise")
const { getProduct } = require("../middleware/functions");
// const category = require('../models/category');
const Product = require('../models/product');
const {authenticationTokenAndAdmin , authenticationToken ,authenticationAndauthorization } = require('../middleware/authorise')


//GET ALL PRODUCTS

router.get('/', async (req, res,) => {
     const qNew = req.query.new;
     const qCategory = req.query.category;

    try {
     let products;
    
     if(qNew) {
       const products = await Product.find().sort({ createdAt: -1 }).limit(1);       
     } else if (qCategory) {
     products = await Product.find({
         categories: {
             $in: [qCategory],
         },
     });
     } else {
         products = await Product.find()
     } 
        res.status(201).send(products);
    } catch (error) {
        res.status(500).send({msg: error.message });
    }
});

//GET ONE PRODUCT

router.get('/:id', (req, res, next) => {
    res.send(res.product);
});


// CREATE PRODUCT

router.post('/', authenticationTokenAndAdmin, async (req, res, next) => {
const { title, category, description, img, price } = req.body;

let product;

img
? (product = new Product({
    title,
    category,
    description,
    img,
    price,
    author: req.user._id
}))
: (product = new Product ({
    title,
    category,
    img,
    price,
    description,
    author: req.user._id
}));

try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
} catch (error) {
    res.status(400).json({ msg: err.message });
}
});

//UPDATE PRODUCT

router.put('/:id', authenticationTokenAndAdmin, async (req, res, next) => {
    if (req.user._id !== res.product)
    res.status(400).json({ msg: "You do not have the permission to update this product"});

 const { title, category, description, img, price } = req.body;
   if(title) res.product.title = title;
   if(category) res.product.category = category;
   if(description) res.product.description = description;
   if(img) res.product.img = img;
   if(price) res.product.price = price;
   
   try {
       const updatedProduct = await res.product.save();
       res.status(201).send(updatedProduct);
   } catch (error) {
       res.status(400).json({ msg: error.message});
   }
});

// DELETE PRODUCT

router.delete('/:id', authenticationTokenAndAdmin, async (req, res, next)=>{
    if (req.user._id !== res.product)
    res.status(400).json({ msg: "You do not have the permission to delete this product" });

     try {
         await res.product.remove();
         res.json({ msg: "Deleted product"});
     } catch (error) {
         res.status(500).json({ msg: error.message});
     }
});

module.exports = router;