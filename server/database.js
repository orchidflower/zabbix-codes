var mysql = require('mysql');
var bluebird = require('bluebird');
var config = require('config');
var log4js = require('log4js');
var format = require('format');

let logger = log4js.getLogger('database');

var pool = null;
function init() {
    if (pool!=null) 
        return;
    var dbConfig = config.get('mysql');
    let _pool = mysql.createPool({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database
    });

    pool = bluebird.promisifyAll(_pool);
    logger.info(format.vsprintf('Mysql [%s:%s/%s] is connected', [dbConfig.host, dbConfig.port, dbConfig.database]));
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