let queries = require('../database/query');
let dbConnection = require('../database/connection');
let genStoreCode = require('../util/generatorString');
let Logger = require('../services/loggerService');
let auditService = require('../audit/auditService');
let auditAction = require('../audit/auditAction');
let APIError = require('../error/apiError');
let errorStatus = require('../error/errorStatus');
let errorType = require('../error/errorType');
const logger = new Logger('book.controller');

exports.getBookList = async (req, res) => {
  let auditOn = genStoreCode.dateFormat();
  try {
    let bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
    let result = await dbConnection.dbQuery(bookListQuery);
    logger.info('return Book List', result.rows);
    auditService.prepareAudit(
      auditAction.actionList.GET_BOOK_LIST,
      result.rows,
      null,
      'elshayeb',
      auditOn
    );
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (err) {
    console.log('book list : ' + err);
    let errorMessage = 'failed to get books' + err;
    auditService.prepareAudit(
      auditAction.actionList.GET_BOOK_LIST,
      null,
      JSON.stringify(errorMessage),
      'elshayeb',
      auditOn
    );
    return res.status(500).send({ error: 'failed to list book' });
  }
};

exports.getBookDetails = async (req, res) => {
  try {
    let bookId = req.params.bookId;
    console.log('Book Id: ' + bookId);
    if (isNaN(bookId))
      throw new APIError(
        errorType.API_ERROR,
        errorStatus.INTERNAL_SERVER_ERROR,
        'Invalid bookId , is not a number , bookId value is : ' + bookId,
        true
      );
    let bookDetialsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
    let result = await dbConnection.dbQuery(bookDetialsQuery, [bookId]);
    return res.status(200).send(JSON.stringify(result.rows[0]));
  } catch (err) {
    console.log('book list detials : ' + err.description);
    if (err.name === errorType.SQL_INJECTION_ERROR)
      logger.error('Failed to get Book Details : ', JSON.stringify(err));
    return res.status(500).send({ error: 'failed to list book details' });
  }
};

exports.saveBook = async (req, res) => {
  try {
    let createdBy = 'admin';
    let createdOn = new Date();

    // request body
    let title = req.body.title;
    let description = req.body.description;
    let author = req.body.author;
    let publisher = req.body.publisher;
    let pages = req.body.pages;
    let storeCode = req.body.storeCode;

    if (!title || !author || !publisher || !storeCode) {
      return res.status(500).send({
        error: 'title , author , publisher , storeCode should not be empty',
      });
    }

    let values = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdBy,
      createdOn,
    ];

    let saveBookQuery = queries.queryList.SAVE_BOOK_QUERY;
    await dbConnection.dbQuery(saveBookQuery, values);
    return res.status(201).send('Successfully adding new book ');
  } catch (err) {
    console.log('Error : ' + err);
    return res.status(500).send({ error: 'Failed to add new book' });
  }
};

exports.updateBook = async (req, res) => {
  try {
    let createdBy = 'admin';
    let createdOn = new Date();

    // request body
    let bookId = req.body.bookId;
    let title = req.body.title;
    let description = req.body.description;
    let author = req.body.author;
    let publisher = req.body.publisher;
    let pages = req.body.pages;
    let storeCode = req.body.storeCode;

    if (!bookId || !title || !author || !publisher || !storeCode) {
      return res.status(500).send({
        error:
          'bookId , title , author , publisher , storeCode should not be empty',
      });
    }
    let values = [
      title,
      description,
      author,
      publisher,
      pages,
      storeCode,
      createdBy,
      createdOn,
      bookId,
    ];

    let updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;

    await dbConnection.dbQuery(updateBookQuery, values);

    return res.status(200).send('Successfully update book title : ' + title);
  } catch (err) {
    console.log('Error : ' + err);
    return res.status(500).send({ error: 'Failed to update book' });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    let bookId = req.params.bookId;

    if (!bookId) {
      return res.status(500).send('bookId should not be empty');
    }

    let deleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
    await dbConnection.dbQuery(deleteBookQuery, [bookId]);

    return res.status(200).send('successfully deleteing book');
  } catch (err) {
    console.log('Error : ' + err);
    return res
      .status(500)
      .send({ error: 'Failed to delete book with id : ' + bookId });
  }
};
