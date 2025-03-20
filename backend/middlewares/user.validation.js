const { body } = require("express-validator")
const { query } = require("express-validator")

const userRegisterValidationRules = [
  body("fullname").isString().withMessage("Name should be string").
    isLength({ min: 3 }).withMessage("Name should be more than 3 characters"),

  body("email").isEmail().withMessage("Email should be more than 8 characters").
    isLength({ min: 5 }).withMessage("Enter valid Email").normalizeEmail(),

  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").
    matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter").
    matches(/[0-9]/).withMessage("Password must contain at least one number").
    matches(/[\W_]/).withMessage("Password must contain at least one special character"),
]

const userLoginValidationRules = [
  body("email").isEmail().withMessage("Email should be more than 8 characters").
    isLength({ min: 5 }).withMessage("Enter valid Email").normalizeEmail(),

  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long").
    matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter").
    matches(/[0-9]/).withMessage("Password must contain at least one number").
    matches(/[\W_]/).withMessage("Password must contain at least one special character"),
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
    .optional()
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .matches(/[\W_]/).withMessage("Password must contain at least one special character"),

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

module.exports = {
  userRegisterValidationRules,
  userLoginValidationRules,
  userUpdateValidationRules,
  autoSuggestionValidationRules,
  getDistanceTimeValidationRules
};