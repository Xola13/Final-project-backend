const User = require("../models/user");
const Product = require("../models/product")
const auth = require('./authorise')


async function getUser(req, res, next) {
    let user 
    try {
        user = await User.findById(req.params.id);
        if(user == null){
            return res.status(404).json({msg: 'User cannot be found' });
        }
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
    res.user = user;
    next();
}


// // //

async function getProduct(req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id);
        if(product == null) {
            return res.status(404).json({msg: 'Product not found'});
        }

    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
    res.product = product;
    next();
}

module.exports = { getUser, getProduct};