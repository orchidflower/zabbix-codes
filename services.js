var db = require("./database");

exports.listAllCodes = function *() {
    console.log("...................list all codes.................");
    var sql = 'select id, code, system, title, level, description, solution, contact from ZABBIX_CODES';
    var rows = yield db.query(sql);
    return rows;
}

exports.queryByCode = function *(code) {
    console.log('....................code = ' + code + '.................');
    var sql = 'select id, code, system, title, level, description, solution, contact from ZABBIX_CODES where code = ?';
    var values = [code];
    var rows = yield db.query(sql, values);
    if (rows.length>=1)
        return rows[0];
    return null;
}