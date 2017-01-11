var db = require("./database");
var log4js = require('log4js');

let logger = log4js.getLogger('services');

/////////////////////////// Codes //////////////////////////////////
exports.listAllCodes = function *() {
    logger.debug("...................list all codes.................");
    var sql = 'select id, code, system, title, level, description, solution, contact from ZABBIX_CODES';
    var rows = yield db.query(sql);
    return rows;
}

exports.queryByCode = function *(code) {
    logger.debug('....................code = ' + code + '.................');
    var sql = 'select id, code, system, title, level, description, solution, contact from ZABBIX_CODES where code = ?';
    var values = [code];
    var rows = yield db.query(sql, values);
    if (rows.length>=1)
        return rows[0];
    return null;
}

exports.addCode = function *(record) {
    logger.debug('.....................add Code...........................');
    logger.debug(record);
    var sql = 'insert into ZABBIX_CODES (code, system, title, level, description, solution, contact) values (?, ?, ?, ?, ?, ?, ?)';
    var values = [record.code, 'SYS', record.title, 0, record.description, record.solution, 'jie.li@xwf-id.com'];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}

exports.updateByCode = function *(code, record) {
    logger.debug('......................update by Code ' + code + '......................' );
    logger.debug(record);
    var sql='update ZABBIX_CODES set title=?, description=?, solution=? where code=?';
    var values = [record.title, record.description, record.solution, record.code];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}

exports.deleteById = function *(id) {
    logger.debug('...................delete code by id:' + id + '................');
    var sql = 'delete from ZABBIX_CODES where id=?';
    var values = [id];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}


////////////////////// Contact //////////////////////////////////
exports.listAllContacts = function *() {
    logger.debug("...................list all contacts.................");
    var sql = 'select id, contact, name, title, qq, weixin, mobile from ZABBIX_CONTACTS';
    var rows = yield db.query(sql);
    return rows;
}

exports.queryByContact = function *(contact) {
    logger.debug('....................contact = ' + contact + '.................');
    var sql = 'select id, contact, name, title, qq, weixin, mobile from ZABBIX_CONTACTS where contact = ?';
    var values = [contact];
    var rows = yield db.query(sql, values);
    if (rows.length>=1)
        return rows[0];
    return null;
}

exports.addContact = function *(record) {
    logger.debug('.....................add Contact...........................');
    logger.debug(record);
    var sql = 'insert into ZABBIX_CONTACTS (contact, name, title, qq, weixin, mobile) values (?, ?, ?, ?, ?, ?)';
    var values = [record.contact, record.name, record.title, record.qq, record.weixin, record.mobile];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}

exports.updateByContact = function *(contact, record) {
    logger.debug('......................update by Contact ' + contact + '......................' );
    logger.debug(record);
    var sql='update ZABBIX_CONTACTS set contact=?, name=?, title=?, qq=?, weixin=?, mobile=? where contact=?';
    var values = [record.contact, record.name, record.title, record.qq, record.weixin, record.mobile];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}

exports.deleteContactById = function *(id) {
    logger.debug('...................delete contact by id:' + id + '................');
    var sql = 'delete from ZABBIX_CONTACTS where id=?';
    var values = [id];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}


////////////////////// System /////////////////////////////////
exports.listAllSystems = function *() {
    logger.debug("...................list all system.................");
    var sql = 'select id, system, description, contact from ZABBIX_SYSTEMS';
    var rows = yield db.query(sql);
    return rows;
}

exports.queryBySystem = function *(system) {
    logger.debug('....................system = ' + system + '.................');
    var sql = 'select id, system, description, contact from ZABBIX_CONTACTS where system = ?';
    var values = [system];
    var rows = yield db.query(sql, values);
    if (rows.length>=1)
        return rows[0];
    return null;
}

exports.addSystem = function *(record) {
    logger.debug('.....................add System...........................');
    logger.debug(record);
    var sql = 'insert into ZABBIX_SYSTEMS (system, description, contact) values (?, ?, ?)';
    var values = [record.system, record.description, record.contact];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}

exports.updateBySystem = function *(system, record) {
    logger.debug('......................update by System ' + system + '......................' );
    logger.debug(record);
    var sql='update ZABBIX_SYSTEMS set system=?, description=?, contact=? where system=?';
    var values = [record.system, record.description, record.contact, system];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}

exports.deleteSystemById = function *(id) {
    logger.debug('...................delete system by id:' + id + '................');
    var sql = 'delete from ZABBIX_SYSTEMS where id=?';
    var values = [id];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}