const express = require("express");

const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidatoinErros } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Notebook } = require("../../db/models");
const router = express.Router();
const validateNotebook = [];


// Get all notebooks that belong to a user
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const notebooks = await Notebook.findAll({
      where: {
        userId,
      },
    });
    return res.json(notebooks);
  })
);

module.exports = router;
