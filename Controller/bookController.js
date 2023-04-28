var queries = require('../database/query');
var dbConnection = require('../database/connection');
var genStoreCode = require('../util/generatorString');

exports.getBookList = async (req, res) => {
  try {
    var bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
    var result = await dbConnection.dbQuery(bookListQuery);

    return res.status(200).send(JSON.stringify(result.rows));
  } catch (err) {
    console.log('book list : ' + err);
    return res.status(500).send({ error: 'failed to list book' });
  }
};

exports.getBookDetials = async (req, res) => {
  try {
    var bookId = req.params.bookId;
    var bookDetialsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
    var result = await dbConnection.dbQuery(bookDetialsQuery, [bookId]);

    return res.status(200).send(JSON.stringify(result.rows[0]));
  } catch (err) {
    console.log('book list detials : ' + err);
    return res.status(500).send({ error: 'failed to list book details' });
  }
};

exports.saveBook = async (req, res) => {
  try {
    var createdBy = 'admin';
    var createdOn = new Date();

    // request body
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var publisher = req.body.publisher;
    var pages = req.body.pages;
    var storeCode = req.body.storeCode;

    if (!title || !author || !publisher || !storeCode) {
      return res
        .status(500)
        .send({
          error: 'title , author , publisher , storeCode should not be empty',
        });
    }

    values = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdBy,
      createdOn,
    ];

    var saveBookQuery = queries.queryList.SAVE_BOOK_QUERY;
    await dbConnection.dbQuery(saveBookQuery, values);
    return res.status(201).send('Successfully adding new book ');
  } catch (err) {
    console.log('Error : ' + err);
    return res.status(500).send({ error: 'Failed to add new book' });
  }
};


exports.updateBook = async (req,res) => {

  try {
    var createdBy = 'admin';
    var createdOn = new Date();

    // request body
    var bookId = req.body.bookId;
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var publisher = req.body.publisher;
    var pages = req.body.pages;
    var storeCode = req.body.storeCode;

    if ( !bookId || !title || !author || !publisher || !storeCode) {
      return res
        .status(500)
        .send({
          error: 'bookId , title , author , publisher , storeCode should not be empty',
        });
    }
    values = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdBy,
      createdOn,
      bookId
    ];

    var updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;

    await dbConnection.dbQuery(updateBookQuery,values);

    return res.status(200).send('Successfully update book title : ' + title);

  } catch (err) {
    console.log('Error : ' + err);
    return res.status(500).send({ error: 'Failed to update book' }); 
  }
};


exports.deleteBook = async (req,res) => {

  try {
    var bookId = req.params.bookId;

    if (!bookId) {
      return res.status(500).send("bookId should not be empty");
    }

    var deleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
    await dbConnection.dbQuery(deleteBookQuery,[bookId]);

    return res.status(200).send("successfully deleteing book")
  } catch (err) {
    console.log('Error : ' + err);
    return res.status(500).send({ error: 'Failed to delete book with id : ' + bookId });
  }
};
