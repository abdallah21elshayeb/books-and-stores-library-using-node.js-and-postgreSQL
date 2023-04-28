var express = require("express");
const router = express.Router();
var controllerNotes = require("../Controller/controllerNote");

router.get("/notes",controllerNotes.getAllNotes);
router.post("/notes/post", controllerNotes.saveNotes);
router.put("/notes/update",controllerNotes.updateNotes);
router.delete("/notes/delete/:noteId",controllerNotes.deleteNotes);

module.exports = router;