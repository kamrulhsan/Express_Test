const {body, validationResult} = require('express-validator');

const userRegistrationValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').notEmpty().isLength({min: 6, max: 10}).withMessage('Password must be 6 to 10 characters long')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).json({errors: errors.array()});
    }

};

module.exports = {
    userRegistrationValidator,
    validate
}