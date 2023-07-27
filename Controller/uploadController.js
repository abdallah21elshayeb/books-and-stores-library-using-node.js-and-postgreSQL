var util = require('../util/generatorString');
var Logger = require('../services/loggerService');
var multer = require('multer');
const logger = new Logger('upload.controller');

exports.uploadFile = async (req, res) => {
  let auditOn = util.dateFormat();

  try {
    let upload = multer({ dest: process.env.UPLOAD_PATH }).single('photo');
    upload(req, res, next => {
      try {
        let path = req.file.path;
        let file = req.file;

        console.log('Path : ' + path);
        console.log('file : ' + JSON.stringify(file));
        // save file in directory
        // save meta dat in data base [file name (rename) , size , mimiType , path]
        return res.status(200).send({ data: 'file is uploaded Successfully ' });
      } catch (e) {
        throw e;
      }
    });
  } catch (err) {
    console.log('Error : ' + err);
    return res.status(500).send({ error: 'Failed to upload file' });
  }
};
