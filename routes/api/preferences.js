const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authMiddleware = require("../../middleware/auth");
const UsersController = require("../../controllers/users");
const PreferencesController = require("../../controllers/preferences");
const { isValidColor } = require("../../utils/validators");

/**
 * @route GET api/preferences
 * @desc Get user's preferences
 * @access Private
 */

router.get("/", authMiddleware, PreferencesController.getPreferences);

/**
 * @route PUT api/preferences/labels
 * @desc Add label to user private labels
 * @access Private
 */

router.put(
  "/labels",
  [
    authMiddleware,
    check("label", "Label must have some name and a valid color!").custom(
      ({ name, color }, { req }) => name && color && isValidColor(color)
    )
  ],
  PreferencesController.addLabel
);

/**
 * @route PUT api/users/preferences/:labelId
 * @desc Update single label in user private labels array
 * @access Private
 */

router.put(
  "/labels/:labelId",
  [
    authMiddleware,
    check("label", "Label must have some name and a valid color!").custom(
      ({ name, color }, { req }) => name && color && isValidColor(color)
    )
  ],
  PreferencesController.updateLabel
);

/**
 * @route DELETE api/preferences/labels/:labelId
 * @desc Remove label from user private labels
 * @access Private
 */

router.delete(
  "/labels/:labelId",
  authMiddleware,
  PreferencesController.removeLabel
);

module.exports = router;
