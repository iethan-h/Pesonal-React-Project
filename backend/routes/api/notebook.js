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
  "/:id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const notebooks = await Notebook.findAll({
      where: {
        user_id:userId,
      },
    });
    return res.json(notebooks);
  })
);

//Get a single notebook
router.get(
  "/:id/notebooks/:notebook_id",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const notebook_id = req.params.notebook_id;
    const notebooks = await Notebook.findByPk(     
        notebook_id     
    );
    return res.json(notebooks);
  })
);

//Create a new notebook
router.post(
  '/',  
  asyncHandler(async (req, res) =>{
    const{title,user_id} = req.body;    
    const notebook = await Notebook.create({title,user_id});
    res.json(notebook);
  })
);


//Delete a notebook
router.delete(
	'/:id(\\d+)',
	
	asyncHandler(async (req, res, next) => {
		const notebook_id = req.params.id;
		const findNotebook = await Notebook.findByPk(notebook_id);
		if (findNotebook) {
			const notebook = await findNotebook.destroy();
			res.status(204).end();
		} else {
			next();
		}
	})
);

module.exports = router;
