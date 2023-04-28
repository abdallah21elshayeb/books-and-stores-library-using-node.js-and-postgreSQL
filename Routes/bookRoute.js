var express = require("express");
const router = express.Router();
var controllerBooks = require("../Controller/bookController");

router.get("/books",controllerBooks.getBookList);
router.get("/books/details/:bookId",controllerBooks.getBookDetials);
router.post("/books/post", controllerBooks.saveBook);
router.put("/books/update",controllerBooks.updateBook);
router.delete("/books/delete/:bookId",controllerBooks.deleteBook);

module.exports = router;