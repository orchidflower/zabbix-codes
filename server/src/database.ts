import * as mysql from 'mysql';
import * as config from 'config';
import * as log4js from 'log4js';
import * as format from 'format';

const logger = log4js.getLogger('database');

let pool: mysql.Pool = null;

function init() {
    if (pool !== null) 
        return;
    let dbConfig: any = config.get('mysql');
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
    let promise = new Promise( (resolve, reject) => {
        pool.query(sql, values, function(error, results, fields) {
            if (error) {
                reject('Failed to query. ' + error);
                return;
            }
            resolve(results);
        });
    });
    return promise;
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