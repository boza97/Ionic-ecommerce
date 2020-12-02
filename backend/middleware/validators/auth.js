const { body } = require('express-validator');

exports.loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email is not valid.')
    .normalizeEmail(),
  body('password')
    .not().isEmpty()
];

exports.registerValidation = [
  body('firstname')
    .isAlpha()
    .withMessage('Firstname is not valid.')
    .trim(),
  body('lastname')
    .isAlpha()
    .withMessage('Lastname is not valid.')
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Invalid email address.')
    .normalizeEmail(),
  body('password', 'Password must be at least 6 characters long and at least have one uppercase letter, lowercase letter, number and special charachter.')
    .custom((value, {req}) => {
      const passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\.]).{6,}$/;
      if(!passReg.test(value)) {
        throw new Error();
      }
      if(value !== req.body.confirmPassword) {
        throw new Error('Password have to match.');
      }
      return true;
    })
    .trim()
];