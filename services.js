var db = require("./database");

exports.listAllCodes = function *() {
    console.log("...................list all codes.................");
    var sql = 'select id, CODE, SYSTEM, TITLE, LEVEL, DESCRIPTION, SOLUTION, CONTACT from ZABBIX_CODES';
    var rows = yield db.query(sql);
    return rows;
}

exports.queryByCode = function *(code) {
    console.log('....................code = ' + code + '.................');
    var sql = 'select id, CODE, SYSTEM, TITLE, LEVEL, DESCRIPTION, SOLUTION, CONTACT from ZABBIX_CODES where CODE = ?';
    var values = [code];
    var rows = yield db.query(sql, values);
    if (rows.length>=1)
        return rows[0];
    return null;
}