const Joi = require("joi");

const registerValidator = (body) => {
  const validationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(10).max(100).required(),
  });
  return validationSchema.validate(body);
};

const loginValidator = (body) => {
  const validationSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(10).max(100).required(),
  });
  return validationSchema.validate(body);
};

module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;
