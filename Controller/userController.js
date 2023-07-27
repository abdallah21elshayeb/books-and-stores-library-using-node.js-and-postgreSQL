let queries = require('../database/query');
let dbConnection = require('../database/connection');
let util = require('../util/generatorString');
let validationUtil = require('../util/validation');
let Logger = require('../services/loggerService');
let auditService = require('../audit/auditService');
let auditAction = require('../audit/auditAction');
let bcrypt = require('bcryptjs');

const logger = new Logger('user.controller');

exports.getUserList = async (req, res) => {
  let auditOn = util.dateFormat();

  try {
    let userListQuery = queries.queryList.GET_USER_LIST_QUERY;
    let result = await dbConnection.dbQuery(userListQuery);
    logger.info('return user list', result.rows);
    auditService.prepareAudit(
      auditAction.actionList.GET_USER_LIST,
      result.rows,
      null,
      'elshayeb',
      auditOn
    );
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (error) {
    console.log('Error : ', error);
    let errorMessage = 'Failed to get users : ' + err;
    auditService.prepareAudit(
      auditAction.actionList.GET_USER_LIST,
      null,
      JSON.stringify(errorMessage),
      'postman',
      auditOn
    );
    return res.status(500).send({ error: 'Failed to get users' });
  }
};

exports.saveUser = async (req, res) => {
  try {
    let createdBy = 'Abdullah Elshayeb';
    let createdOn = util.dateFormat();
    // req.body
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    let fullName = req.body.fullName;
    let userTypeCode = req.body.userTypeCode;
    // list groups added to user
    let groups = req.body.groups;

    if (
      !userName ||
      !password ||
      !email ||
      !fullName ||
      !userTypeCode ||
      !groups
    ) {
      return res.status(500).send({
        error:
          'userName , password , email , fullName , userTypeCode , selected groups are required and can not be empty',
      });
    }
    console.log('userName : ' + JSON.stringify([userName, email]));

    /**
     *  Validation
     *   1- username or email not exist
     *   2- is email
     *   3- validate password strength
     * */
    // var isUserExistsQuery = queries.queryList.IS_USER_EXISTS_QUERY;
    // var result = dbConnection.dbQuery(isUserExistsQuery, [userName, email]);
    // console.log('Result : ' + JSON.stringify(result));

    // if (result.rows[0].count != "0") {
    //   return res.status(500).send({ error: 'User is not valid' });
    // }

    if (!validationUtil.isValidEmail(email)) {
      return res.status(500).send({ error: 'Email is not valid' });
    }
    if (!validationUtil.isValidPassword(password)) {
      return res.status(500).send({ error: 'password is not valid' });
    }

    // Everything is OKAY

    let hashedPassword = await bcrypt.hash(password, 10);
    let values = [
      userName, 
      hashedPassword,
      email,
      userTypeCode,
      fullName,
      createdOn,
      createdBy,
    ];
    let saveUserQuery = queries.queryList.SAVE_USER_QUERY;
    await dbConnection.dbQuery(saveUserQuery, values);
    return res.status(201).send('Successfully adding new user ');
  } catch (err) {
    console.log('Error : ' + err);
    return res.status(500).send({ error: 'Failed to add new user' });
  }
};
