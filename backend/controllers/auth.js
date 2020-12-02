const { validationResult } = require('express-validator');
const User = require('../models/User');
const ShippingAddress = require('../models/ShippingAddress');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 400;
    error.data = errors.array();
    return next(error);
  }
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({where: {email: email}});

    if(!user) {
      return res.status(422).json({
        status: 'EMAIL_NOT_FOUND',
        message: 'A user with this email could not be found.'
      });
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if(!isEqual) {
      return res.status(422).json({
        status: 'INVALID_PASSWORD',
        message: 'Wrong password.'
      });
    }

    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        firstname: user.firstname, 
        lastname: user.lastname
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    res.status(200).json({
      status: 'OK',
      token: token,
      expiresIn: 3600,
      user: {
        userId: user.user_id,
        email: user.email,
        firstname: user.firstname, 
        lastname: user.lastname
      }
    });
  } catch (error) {
    if(!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    error.data = errors.array();
    next(error);
  }
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const users = await User.findAll({where: {email: email}})
    if(users.length > 0) {
      return res.status(422).json({
        status: 'EMAIL_EXISTS',
        message: 'Email already exist.'
      });
    }

    const passHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: passHash
    });

    const contactName = user.firstname + ' ' + user.lastname;

    await ShippingAddress.create({
      contact_name: contactName,
      user_id: user.user_id
    });
  
    res.status(201).json({
      status: 'OK',
      message: 'User registred successfully.'
    });
  } catch(err) {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};