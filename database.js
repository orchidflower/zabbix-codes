var mysql = require('mysql');
var bluebird = require('bluebird');

var pool = null;
function init() {
    if (pool!=null) 
        return;
    let _pool = mysql.createPool({
        host: '10.1.22.25',
        port: 3306,
        user: 'root',
        password: 'lydsec',
        database: 'zabbix_codes'
    });

    pool = bluebird.promisifyAll(_pool);
}

init();

var query=function *(sql, callback) {
    var rows = yield pool.queryAsync(sql);
    return rows;
}

var query=function *(sql, values, callback) {
    var rows = yield pool.queryAsync(sql, values);
    return rows;
}

module.exports.query = query;