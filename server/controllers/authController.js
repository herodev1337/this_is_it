const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/test");
const User = require('../models/userSchema');
const logger = require('../utils/logger');
const { registerValidator, loginValidator } = require('../utils/validator');
const chalk = require('chalk'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    
    //Validation
    const { error } = registerValidator(req.body);
    if(error){
        logger(`${chalk.cyan(req.ip)} throwed error ${chalk.bgRed(error)}`, 'Authentication Controller', 3)
        res.status(400).send(error)
    }

    //Check UN
    const userExists = await User.findOne({ username: req.body.username});
    if(userExists) return res.status(400).send("Username already exisiting!")

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //User Creation
    const user = new User({
        username: req.body.username,
        password: hashedPassword
    })
    try{
        const savedUser = await user.save();
        res.status(200).send({user: savedUser._id});
    } catch (e){
        res.status(400).send(e)
    }
}

const loginUser = async (req, res) => {
    //Validation
    const { error } = loginValidator(req.body);
    if(error){
        logger(`${chalk.cyan(req.ip)} throwed error ${chalk.bgRed(error)}`, 'Authentication Controller', 3)
        res.status(400).send(error)
    }

    //Check UN
    const user = await User.findOne({ username: req.body.username});
    if(!user) return res.status(400).send("Username not exisiting!")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send("Invalid PW!");

    //TODO: Add token_secret to config
    const token = jwt.sign({ _id: user._id }, "TOKEN_SECRET")
    res.header('auth-token', token).send(token);
    
}

module.exports = {
    registerUser,
    loginUser
}