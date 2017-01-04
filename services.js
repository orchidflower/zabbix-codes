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

exports.addCode = function *(record) {
    console.log('.....................add Code...........................');
    console.log(record);
    var sql = 'insert into ZABBIX_CODES (code, system, title, level, description, solution, contact) values (?, ?, ?, ?, ?, ?, ?)';
    var values = [record.code, 'SYS', record.title, 0, record.description, record.solution, 'jie.li@xwf-id.com'];
    var rows = yield db.query(sql, values);
    console.log(rows);
    return rows;
}

exports.updateByCode = function *(code, record) {
    console.log('......................update by Code ' + code + '......................' );
    console.log(record);
    var sql='update ZABBIX_CODES set title=?, description=?, solution=? where code=?';
    var values = [record.title, record.description, record.solution, record.code];
    var rows = yield db.query(sql, values);
    console.log(rows);
    return rows;
}

exports.deleteById = function *(id) {
    console.log('...................delete code by id:' + id + '................');
    var sql = 'delete from ZABBIX_CODES where id=?';
    var values = [id];
    var rows = yield db.query(sql, values);
    console.log(rows);
    return rows;
}