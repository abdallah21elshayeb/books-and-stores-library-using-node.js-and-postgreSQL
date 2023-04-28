var express = require("express");
const router = express.Router();
var controllerStores = require("../Controller/storeController");

router.get("/stores",controllerStores.getStoreList);
router.post("/stores/post", controllerStores.saveStore);
// router.put("/stores/update",controllerNotes.updateNotes);
// router.delete("/stores/delete/:noteId",controllerNotes.deleteNotes);

module.exports = router;