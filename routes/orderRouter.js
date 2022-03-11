// require('dotenv').config();

// const express = require("express");
// const router = express.Router();
// const { getProduct } = require("../middleware/functions");
// const category = require('../models/category');
// const Product = require('../models/product');
// const {authenticationTokenAndAdmin , authenticationToken ,authenticationAndauthorization, authenticationTokenAndAuthorization } = require('../middleware/authorise');
// const Order = require('../models/Order');
// const { modelName } = require('../models/product');

// // CREATE

// // router.post('/', authenticationToken, async (req, res, next) => {
    
// //     const newOrder = new Order(req.body);
    
// //     try {
// //         const savedOrder = await newOrder.save();
// //         res.status(200).json(savedOrder);
// //     } catch (error) {
// //         res.status(500).json(err);
// //     }
// // })

// // //UPDATE

// // router.put('/:id', authenticationTokenAndAdmin, async (req, res, next) => {

// //     try {
// //         const updatedOrder = await Order.findByIdAndUpdate(
// //             req.params.id,
// //             {
// //                 $set: req.body,
// //             },
// //             { new: true }
// //         );
// //     } catch (error) {
        
// //         res.status(500).json(err);
// //     }
// // });


// // //DELETE

// // router.delete('/:id', authenticationTokenAndAdmin, async (req, res, next) => {
    
// //    try {
// //        await Order.findByIdAndDelete(req.params.id);
// //        res.status(200).json("Order has been deleted...");
// //    } catch (error) {
// //        res.status(500).json(err)
// //    } 
// // });


// // //GET USER ORDERS

// // router.get('/find/:userId', authenticationTokenAndAuthorization , async (req, res, next) => {

// //     try {
// //         const orders = await Order.find({ userId: req.params.userId });
// //         res.status(200).json(orders)
// //     } catch (error) {
// //         res.status(500).json(err);
// //     }
// // });


// // // GET ALL

// // router.get('/', authenticationTokenAndAdmin , async (req, res, next) => {

// //     try {
// //         const orders = await Order.find();
// //         res.status(200).json(orders);

// //     } catch (error) {
// //         res.status(500).json(err);
// //     }
// // });


// // // GET MONTHLY INCOME

// // router.get('/income', authenticationTokenAndAdmin , async (req, res, next) => {
    
// //     const date = new Date();
// //     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
// //     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    
// //     try {
// //          const income = await Order.aggregate([
// //              { $match: { createdAt: { $gte: previousMonth }}},
// //             {
// //                 $project: {
// //                     month: { $month: "$createdAt"},
// //                     sales: "$amount",
// //                 },
// //             },
// //             {
// //                 $group: {
// //                     _id: "$month",
// //                     total: { $sum: "$sales" },
// //                 },
// //             },
// //          ]);
// //             res.status(200).json(income);
         
// //     } catch (error) {
// //         res.status(500).json(err)
// //     }
// // });

// modelName.exports = router;