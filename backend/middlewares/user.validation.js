const { body } = require("express-validator")
const { query } = require("express-validator")

const userRegisterValidationRules = [
  body("fullname").isString().withMessage("Name should be string").
    isLength({ min: 3 }).withMessage("Name should be more than 3 characters"),

  body("email").isEmail().withMessage("Enter valid email").
    isLength({ min: 5 }).withMessage("Email more than 5 characters").normalizeEmail(),

  body("password").notEmpty().withMessage('Password is required')
  .isLength({ min: 8 }).withMessage('Password should be more than 8 characters'),
]

const userLoginValidationRules = [
  body("email").isEmail().withMessage("Email should be more than 8 characters").
    isLength({ min: 5 }).withMessage("Enter valid Email").normalizeEmail(),

  body("password").isLength({ min: 8 }).notEmpty().withMessage('Password is required')
  .isLength({ min: 8 }).withMessage('Password should be more than 8 characters'),
]

const userUpdateValidationRules = [
  body("name")
    .optional()
    .isString().withMessage("Name should be a string")
    .isLength({ min: 3 }).withMessage("Name should be more than 3 characters"),

  body("email")
    .optional()
    .isEmail().withMessage("Enter a valid email")
    .isLength({ min: 5 }).withMessage("Email should be more than 5 characters")
    .normalizeEmail(),

  body("password")
    .optional().notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password should be more than 8 characters'),

  body("age")
    .optional()
    .isInt({ min: 1, max: 120 }).withMessage("Age should be between 1 and 120"),

  body("bloodType")
    .optional()
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"])
    .withMessage("Invalid Blood Type"),

  body("gender")
    .optional()
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be male, female, or other"),

  body("address")
    .optional()
    .isString().withMessage("Address must be a string")
    .trim(),

  body("phone")
    .optional()
    .isString().withMessage("Phone number must be a string")
    .isLength({ min: 10 }).withMessage("Phone number should be at least 10 characters long")
    .matches(/^\d+$/).withMessage("Phone number must contain only digits"),
];
const autoSuggestionValidationRules = [
  query("input")
    .isString().withMessage("Input should be a string")
    .isLength({ min: 3 }).withMessage("Input should be at least 3 characters long")
];

const getDistanceTimeValidationRules = [
  query("origin")
    .isString().withMessage("Origin should be a string")
    .isLength({ min: 3 }).withMessage("Origin should be at least 3 characters long"),

  query("destination")
    .isString().withMessage("Destination should be a string")
    .isLength({ min: 3 }).withMessage("Destination should be at least 3 characters long")
];

const orgRegistrationValidationRules = [
    // orgName validation
    body('orgName')
      .notEmpty().withMessage('Organization name is required')
      .isLength({ min: 3 }).withMessage('Organization name should be more than 3 characters')
      .trim(),

    // email validation
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
      .isLength({ min: 8 }).withMessage('Email should be more than 8 characters')
      .normalizeEmail(),

    // password validation
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password should be more than 8 characters'),

    // address validation
    body('address')
      .notEmpty().withMessage('Address is required')
      .trim(),

    // orgType validation
    body('orgType')
      .notEmpty().withMessage('Organization type is required')
      .isIn(['bloodbank', 'hospital', 'ngo']).withMessage('Invalid organization type'),

    // contactNumber validation
    body('contactNumber')
      .notEmpty().withMessage('Contact number is required')
      .isLength({ min: 10 }).withMessage('Contact number should be at least 10 digits')
      .isMobilePhone().withMessage('Invalid phone number')
      .trim(),

    // registrationNumber validation (optional)
    body('registrationNumber')
      .optional()
      .trim()
  ];

  const orgSigninValidationRules = [
    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Invalid email format')
      .isLength({ min: 8 }).withMessage('Email should be more than 8 characters')
      .normalizeEmail(),

    // password validation
    body('password')
      .notEmpty().withMessage('Password is required')
      .isLength({ min: 8 }).withMessage('Password should be more than 8 characters'),
  ]


module.exports = {
  userRegisterValidationRules,
  userLoginValidationRules,
  userUpdateValidationRules,
  autoSuggestionValidationRules,
  getDistanceTimeValidationRules,
  orgRegistrationValidationRules,
  orgSigninValidationRules
};