let events = require('events');
let audit = require('../model/auditModel');
let queries = require('../database/query');
let dbConnection = require('../database/connection');
let emitter = new events.EventEmitter();

const auditEvent = 'audit';
emitter.on(auditEvent, (audit) => {
  //steps of actions && save in db
  try {
    let values = [
      audit.auditAction,
      JSON.stringify(audit.data),
      audit.status,
      audit.status,
      audit.auditBy,
      audit.auditOn,
    ];
    let auditQuery = queries.queryList.AUDIT_QUERY;
    dbConnection.dbQuery(auditQuery, values);
  } catch (error) {
    console.log('Audit Event Emitter - error : ' + error);
  }
});

exports.prepareAudit = (auditAction, data, error, auditBy, auditOn) => {
  let status = 200;
  if (error) status = 500;

  let auditObj = new audit.Audit(
    auditAction,
    data,
    status,
    error,
    auditBy,
    auditOn
  );
  emitter.emit(auditEvent, auditObj);
};
