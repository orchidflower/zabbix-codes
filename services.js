var db = require("./database");
var log4js = require('log4js');

let logger = log4js.getLogger('services');

/////////////////////////// Codes //////////////////////////////////
exports.listAllCodes = function *() {
    logger.debug("...................list all codes.................");
    var sql = `select a.id as id, code, a.system as system, b.name as systemname, a.title as title, a.level as level, 
               d.name as levelname, a.description, solution, a.contact as contact, 
               c.name as contactname 
               from ZABBIX_CODES as a, ZABBIX_SYSTEMS as b, ZABBIX_CONTACTS as c, ZABBIX_LEVELS as d
               where a.system=b.system and a.contact=c.contact and a.level=d.level`;
    var rows = yield db.query(sql);
    return rows;
}

exports.queryByCode = function *(code) {
    logger.debug('....................code = ' + code + '.................');
    var sql = `select a.id as id, code, a.system as system, b.name as systemname, a.title as title, a.level as level, 
               d.name as levelname, a.description, solution, a.contact as contact, 
               c.name as contactname, d.description as leveldescription, c.qq, c.weixin, c.mobile, 
               b.contact as systemcontact, b.description as systemdescription
               from ZABBIX_CODES as a, ZABBIX_SYSTEMS as b, ZABBIX_CONTACTS as c, ZABBIX_LEVELS as d
               where a.system=b.system and a.contact=c.contact and a.level=d.level and code = ?`;
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
    var values = [record.code, record.system, record.title, record.level, record.description, record.solution, record.contact];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}

exports.updateByCode = function *(code, record) {
    logger.debug('......................update by Code ' + code + '......................' );
    logger.debug(record);
    var sql='update ZABBIX_CODES set title=?, level=?, system=?, description=?, solution=?, contact=? where code=?';
    var values = [record.title, record.level, record.system, record.description, record.solution, record.code, record.contact];
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
    var sql = 'select a.id as id, contact, a.name as name, a.title as title, b.name as titlename, qq, weixin, mobile from ZABBIX_CONTACTS as a, ZABBIX_TITLES as b where a.TITLE=b.TITLE';
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

exports.updateContactByContact = function *(contact, record) {
    logger.debug('......................update by Contact ' + contact + '......................' );
    logger.debug(record);
    var sql='update ZABBIX_CONTACTS set name=?, title=?, qq=?, weixin=?, mobile=? where contact=?';
    var values = [record.name, record.title, record.qq, record.weixin, record.mobile, contact];
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
    var sql = 'select a.id as id, system, a.name as name, description, a.contact, b.name as contactname from ZABBIX_SYSTEMS as a, ZABBIX_CONTACTS as b where a.contact=b.contact';
    var rows = yield db.query(sql);
    return rows;
}

exports.queryBySystem = function *(system) {
    logger.debug('....................system = ' + system + '.................');
    var sql = 'select id, system, name, description, contact from ZABBIX_CONTACTS where system = ?';
    var values = [system];
    var rows = yield db.query(sql, values);
    if (rows.length>=1)
        return rows[0];
    return null;
}

exports.addSystem = function *(record) {
    logger.debug('.....................add System...........................');
    logger.debug(record);
    var sql = 'insert into ZABBIX_SYSTEMS (system, name, description, contact) values (?, ?, ?, ?)';
    var values = [record.system, record.name, record.description, record.contact];
    var rows = yield db.query(sql, values);
    logger.debug(rows);
    return rows;
}

exports.updateBySystem = function *(system, record) {
    logger.debug('......................update by System ' + system + '......................' );
    logger.debug(record);
    var sql='update ZABBIX_SYSTEMS set system=?, name=?, description=?, contact=? where system=?';
    var values = [record.system, record.name, record.description, record.contact, system];
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

/////////////////////////// Titles //////////////////////////////////
exports.listAllTitles = function *() {
    logger.debug("...................list all titles.................");
    var sql = 'select id, title, name from ZABBIX_TITLES';
    var rows = yield db.query(sql);
    return rows;
}

////////////////////////// Levels ///////////////////////////////////
exports.listAllLevels = function *() {
    logger.debug("...................list all levels.................");
    var sql = 'select id, level, name from ZABBIX_LEVELS';
    var rows = yield db.query(sql);
    return rows;
}
