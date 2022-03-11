require("dotenv").config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const {getProduct, getUser } = require("../middleware/functions");
const product = require("../models/product");
// const auth = require('../middleware/authorise');
const { authenticationToken, authenticationTokenAndAuthorization, authenticationTokenAndAdmin } = require("../middleware/authorise")

// GETTING ALL USERS

router.get('/', authenticationTokenAndAdmin ,async (req, res, next)=> {
    try {
        const users = await User.find()
        res.json(users)

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
})

// GET ONE

router.get('/find/:id', authenticationTokenAndAdmin, async (req, res, next)=>{
  try {
      const user = await User.findById(req.params.id);
      const { password, ...others} = user._doc;
      res.status(200).json(others)
  } catch (error) {
      res.status(500).json(err)
  }
});

// LOG IN

router.patch("/", async (req, res, next)=> {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if(!user) res.status(404).json({ msg: "USER NOT FOUND"})
    if(await bcrypt.compare(password, user.password)) {
        try {
            const access_token = jwt.sign(
                JSON.stringify(user),
                process.env.JWT_SECRET_KEY
            );
             res.status(201).json({ jwt: access_token});
        } catch (error) {
            res.status(500).json({ msg: error.message});
        }
    }else{
        res.status(400).json({ msg: "Email or password is incorrect"})

    }
});


//DELETE USER

router.delete('/:id', authenticationTokenAndAuthorization, async (req, res, next) => {
    try {
        await res.user.remove();
        res.json({ msg: "User deleted"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
});

//UPDATE USER

router.put('/:id', authenticationTokenAndAuthorization, async (req, res, next)=> {
    const {name, contact, password, avatar, about } = req.body;
    if(name) res.user.name = name;
    if(contact) res.user.contact = contact;
    if(password) {
        const salt = await res.user.save();
        const hashedPassword = await bcrypt.hash(password, salt);
        res.user.password = hashedPassword;
    }
    if(avatar) res.user.avatar = avatar;
    if(about) res.user.about = about;

    try {
        const updatedUser = await res.user.save();
        res.status.send(updatedUser);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});


//USER REGISTRATION

router.post('/', async (req, res, next)=>{
    const {name, email, contact, password} =req.body;
   
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        contact,
        password: hashedPassword,
    });

    try {
        const newUser = await user.save();
        
    try{
    const access_token = jwt.sign(
        JSON.stringify(newUser),
        process.env.JWT_SECRET_KEY
    );
    res.status(200).json({jwt: access_token});
    }catch (error) {
        res.status(500).json({ msg: error.message});
    }
    }catch (error) {
     res.status(400).json({ msg: error.message});
    }
});


module.exports = router;