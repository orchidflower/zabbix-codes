"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const config = require("config");
const log4js = require("log4js");
const format = require("format");
const logger = log4js.getLogger('database');
let pool = null;
function init() {
    if (pool !== null)
        return;
    let dbConfig = config.get('mysql');
    pool = mysql.createPool({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database
    });
    logger.info(format.vsprintf('Mysql [%s:%s/%s] is connected', [dbConfig.host, dbConfig.port, dbConfig.database]));
}
async function query(sql, values) {
    let promise = new Promise((resolve, reject) => {
        pool.query(sql, values, function (error, results, fields) {
            if (error) {
                reject('Failed to query. ' + error);
                return;
            }
            resolve(results);
        });
    });
    return promise;
}
exports.query = query;
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
