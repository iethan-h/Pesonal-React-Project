const express = require("express");

const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidatoinErros } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

const { Note } = require("../../db/models");

const router = express.Router();



const validateNote = [];



//GET /notes => return all users notes
router.get(
  "/:notebook_id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const notebook_id = req.params.notebook_id;
    const notes = await Note.findAll({
      where: {
        notebook_id
      },
    });
    return res.json(notes);
  })
);

module.exports = router;