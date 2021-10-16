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
    const {notebook_id} = req.params;
    const notes = await Note.findAll({
      where: {
        notebook_id
      },
    });
    return res.json(notes);
  })
);

//Create a new note
router.post(
  '/:notebook_id',  
  asyncHandler(async (req, res) =>{
    const {notebook_id} = req.params
    const{user_id,content} = req.body;    
    const note = await Note.create({user_id,notebook_id,content});
    res.json(note);
  })
)

module.exports = router;