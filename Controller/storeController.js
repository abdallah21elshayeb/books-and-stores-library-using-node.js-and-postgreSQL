var queries = require('../database/query');
var dbConnection = require('../database/connection');
var genStoreCode = require('../util/generatorString');
exports.getStoreList = async (req, res) => {
  try {
    var storeListQuery = queries.queryList.GRT_STORE_LIST_QUERY;
    var result = await dbConnection.dbQuery(storeListQuery);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (err) {
    console.log('store list : ' + err);
    return res.status(500).send({ error: 'failed to list store' });
  }
};

exports.saveStore = async (req, res) => {
  try {
    var storeName = req.body.storeName;
    var address = req.body.address;
    var createdBy = 'admin';
    var createdOn = new Date();
    var storeCode = genStoreCode.generateStoreCode();

    console.log("storeName : " + storeName + "----------adsress : " + address + "-----------time : " +createdOn);
    if (!storeName || !address) {
      return res
        .status(500)
        .send({ error: 'title and content should not be empty' });
    }
    var values = [storeName, storeCode,address, createdOn, createdBy];
    var saveStoreQuery = queries.queryList.SAVE_STORE_QUERY;
    await dbConnection.dbQuery(saveStoreQuery,values);
    return res.status(201).send('All stores is saves');
  } catch (err) {
    console.log('store list : ' + err);
    return res.status(500).send({ error: 'failed to list store' });
  }
};
