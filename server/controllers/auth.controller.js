const User = require('../../models/User')
const logger = require('../../utils/logger')
const { registerValidator } = require('../../utils/validator')
const chalk = require('chalk')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

/**
 * Tries to create a new User
 * @async
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @returns {Object} JSON
 */
const registerUser = async (req, res) => {
    //Validation
    const { error } = registerValidator(req.body)
    if (error && config.Debug) {
        logger(`${chalk.cyan(req.ip)} throwed error ${chalk.bgRed(error)}`, 'Authentication Controller', 3)
        res.status(400).json({ error: error.message })
    }

    //Check if User Exists
    if (await getUser(req.body.username)) return res.status(400).json({ error: 'Username already exists!' })

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
                    message: 'User created successfully!'
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
    //If user dosent exist -> Error
    const currentUser = await getUser(req.body.username)
    if (!currentUser) return res.render('admin/login', { error: 'Unknown Combination!' })

    //If password dosent match -> Error
    let compPassword = await comparePassword(req.body.password, currentUser.password);
    if (!compPassword) return res.render('admin/login', { error: 'Unknown Combination!' })

    res.cookie('auth_token', generateJWTtoken({ id: currentUser._id }))
        .redirect('/admin/')
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
    let comparedPassword = await bcrypt.compare(password, hashedPassword);
    return comparedPassword
}

/**
 * Generates the JWT token with the data provided and signs it
 * @param  {Object} data - The data in the JWT token
 * @returns {String}
 */
const generateJWTtoken = (data) => {
    return jwt.sign(data, config.SECRET_TOKEN)
}

module.exports = {
    registerUser,
    loginUser,
}
