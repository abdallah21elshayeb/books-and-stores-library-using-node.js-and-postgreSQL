let queries = require('../database/query');
let dbConnection = require('../database/connection');
let util = require('../util/generatorString');
let validationUtil = require('../util/validation');
let Logger = require('../services/loggerService');
let errorStatus = require('../error/errorStatus');
let errorType = require('../error/errorType');
let auditService = require('../audit/auditService');
let auditAction = require('../audit/auditAction');
let bcrypt = require('bcryptjs');

const logger = new Logger('login.controller');

exports.getUserProfile = async (req, res) => {
  let user = req.user;
  try {
    return res.status(200).send(JSON.stringify(user));
  } catch (err) {
    console.log('Error : ' + err);
    let errorMessage = 'Failed to get user : ' + err;
    return res.status(500).send({ error: 'Failed to get user' });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    /**
     *  1- validate is not empty
     *  2- get user by username
     *  3- Compare password
     *  4- get user roles
     *  5- generate token
     */
    console.log('username:', username);
    console.log('password:', password);
    // (1) //
    if (!username || !password) {
      return res.status(500).send({
        error: 'userName and password are required, can not be empty ',
      });
    }
    // (2) //
    let loginQuery = queries.queryList.LOGIN_QUERY;
    let result = dbConnection.dbQuery(loginQuery, [username]);
    let dbResponse = result.rows[0];

    if (dbResponse == null) {
      logger.info('user : [' + username + '] not exist in db');
    }
    console.log('username222:', username);
    console.log('password:', password);
    // (3) //
    let isPasswordValid = validationUtil.comparePassword(
      password,
      dbResponse.password
    );
    if (!isPasswordValid) {
      logger.info('Invalid password');
      return res
        .status(errorStatus.UNAUTHORIZED)
        .send({ error: 'Invalid username or password' });
    }

    // (4) //
    let userRoles = await this.getUserRoles(dbResponse.user_id, req, res);
    console.log('userRoles : ' + JSON.stringify(userRoles));

    let token = jwtUtil.generateToken(
      dbResponse.user_id,
      dbResponse.username,
      dbResponse.email,
      dbResponse.FULL_NAME,
      userRoles,
      dbResponse.user_type_code
    );
    return res.status(200).send(JSON.stringify(token));
  } catch (err) {
    logger.error(
      'Failed to SignIn , Invalid username or password' + JSON.stringify(err)
    );
    return res
      .status(500)
      .send({ error: 'Failed to SignIn , Invalid username or password' });
  }
};

exports.getUserRoles = async (userId) => {
  try {
    let roles = ['user'];
    return roles;
  } catch (err) {
    return res.status(400).send({ error: 'Invalid roles' });
  }
};
