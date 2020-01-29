const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authMiddleware = require("../../middleware/auth");
const AuthController = require("../../controllers/auth");

/**
 * @route GET api/auth
 * @desc Authenticate user
 * @access Private
 */

router.get("/", authMiddleware, AuthController.authUser);

/**
 * @route POST api/auth
 * @desc Sign in user and get JWT
 * @access Public
 */

router.post(
  "/",
  [
    check("email")
      .isEmail()
      .withMessage("Please, enter correct email!"),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long!")
  ],
  AuthController.signIn
);

/**
 * @route GET api/auth/confirmation
 * @desc Confirm user email based on 'token' query param
 * @access Public
 */

router.get('/confirmation', AuthController.emailConfirmation)

/**
 * @route GET api/auth/confirmation/resend
 * @desc Resend email confirmation token
 * @access Public
 */

router.post('/confirmation/resend', [
  check("email")
      .isEmail()
      .withMessage("Please, enter correct email!"),
], AuthController.emailConfirmationResend)

module.exports = router;
