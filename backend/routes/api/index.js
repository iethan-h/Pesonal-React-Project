const router = require("express").Router();

const sessionRouter = require("./session");
const usersRouter = require("./users");
const notebookRouter = require("./notebook");
const notesRouter = require("./note");


router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/notebooks", notebookRouter);
router.use("/notes", notesRouter);



module.exports = router;