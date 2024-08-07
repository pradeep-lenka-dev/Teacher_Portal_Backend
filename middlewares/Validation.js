const { body } = require("express-validator");
const Teacher = require("../models/teacherModel");

const validateTeacher = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .custom(async (value) => {
      const teacher = await Teacher.findOne({ email: value });
      if (teacher) {
        throw new Error("Email already in use");
      }
    }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),
  // body('subjects').isArray().withMessage('Subjects must be an array').notEmpty().withMessage('Subjects are required')
];

module.exports = validateTeacher;
