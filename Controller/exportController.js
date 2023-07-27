let queries = require('../database/query');
let dbConnection = require('../database/connection');
let util = require('../util/generatorString');
let validationUtil = require('../util/validation');
let Logger = require('../services/loggerService');
let errorStatus = require('../error/errorStatus');
let errorType = require('../error/errorType');
let fastCsv = require('fast-csv');
let fs = require('fs');
let ws = fs.createWriteStream('books.csv');

const logger = new Logger('export.controller');

exports.exportBooks = async (req, res) => {
  try {
    let bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
    let result = await dbConnection.dbQuery(bookListQuery);
    logger.info('return Book List', result.rows);

    const data = JSON.parse(JSON.stringify(result.rows));

    fastCsv
      .write(data, { headers: true })
      .on('end', () => {
        console.log('write to books.csv successfully');
        res.download('books.csv', function () {
          console.log('file downloaded successfully');
        });
      })
      .pipe(ws);
      // return res.status(200).send({data : "export data successfully"})
  } catch (err) {
    console.log('Error : ' + err);
    return res.status(500).send({ error: 'Failed to export books' });
  }
};
