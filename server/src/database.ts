import * as mysql from 'mysql';
// const mysql = require('mysql');
var config = require('config');
var log4js = require('log4js');
var format = require('format');

const logger = log4js.getLogger('database');

let pool: mysql.Pool = null;

function init() {
    if (pool !== null) 
        return;
    var dbConfig = config.get('mysql');
    pool = mysql.createPool({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database
    });

    logger.info(format.vsprintf('Mysql [%s:%s/%s] is connected', [dbConfig.host, dbConfig.port, dbConfig.database]));
}

export async function query(sql: any, values?: any) {
    if (values) {
        let rows = await pool.query(sql, values);
        return rows;
    } else {
        let rows = await pool.query(sql);
        return rows;    
    }
}

// var query=function *(sql, callback) {
//     var rows = yield pool.queryAsync(sql);
//     return rows;
// }

// var query=function *(sql, values, callback) {
//     var rows = yield pool.queryAsync(sql, values);
//     return rows;
// }

init();

// module.exports.query = query;