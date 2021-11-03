const User = require('../models/User')
const logger = require('../utils/logger')
const { registerValidator, loginValidator } = require('../utils/validator')
const chalk = require('chalk')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const showLogin = (req, res) => {
    res.render('auth/login')
}

const registerUser = async (req, res) => {
    //Validation
    const { error } = registerValidator(req.body)
    if (error) {
        logger(`${chalk.cyan(req.ip)} throwed error ${chalk.bgRed(error)}`, 'Authentication Controller', 3)
        res.status(400).json({ error: error.message })
    }

    //Check if User Exists
    if (await getUser(req.body)) return res.status(400).json({ error: 'User already exists!' })

    //User Creation
    const user = new User({
        username: req.body.username,
        password: await hashPassword(req.body.password),
    })

    try {
        const savedUser = await user.save()
        res.cookie('auth_token', generateJWTtoken({ id: savedUser._id }))
            .json({
                error: null,
                data: {
                    message: 'User created successfully'
                }
            })
    } catch (e) {
        res.status(400)
            .json({
                error: e.message
            })
    }
}

const loginUser = async (req, res) => {
    //Validation
    const { error } = loginValidator(req.body)
    if (error) {
        logger(`${chalk.cyan(req.ip)} throwed error ${chalk.bgRed(error)}`, 'Authentication Controller', 3)
        return res.status(400).json({ error: error })
    }

    const currentUser = await getUser(req.body.username)

    //If user dosent exist -> 400
    if (!currentUser) return res.status(400).json({ error: 'User dosent exist!' })

    //If password dosent match -> 400
    if (!comparePassword(req.body.password, currentUser.password)) return res.status(400).json({ error: 'Password dosent match!' })

    //TODO: Add token_secret to config
    res.cookie('auth_token', generateJWTtoken({ id: currentUser._id }))
        .json({ 
            error: null,
            data: { 
                message: 'Logged in successfully!'
            }
        })
}

/**
 * Checks if user is in Database
 * @async
 * @param {String} username - Username of the user
 * @returns {Object}
 */
const getUser = async (username) => {
    return await User.findOne({ username: username })
}

/**
 * Generates the salt and hashes the password
 * @async
 * @param  {String} password - Plaintext password
 * @returns {String} - Returns hashedPassword
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

/**
 * Compares plaintext password against hashed password in database
 * @async
 * @param  {String} password
 * @param  {String} hashedPassword
 * @return {Boolean}
 */
const comparePassword = async (password, hashedPassword) => {
    return (await bcrypt.compare(password, hashedPassword)) ? true : false
}

/**
 * Generates the JWT token with the data provided and signs it
 * TODO: Add token_secret to config
 * @param  {Object} data - The data in the JWT token
 * @returns {String}
 */
const generateJWTtoken = (data) => {
    return jwt.sign(data, 'TOKEN_SECRET')
}

module.exports = {
    registerUser,
    loginUser,
    showLogin,
}