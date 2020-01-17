import * as Logger from './logger';
import * as mysql from 'mysql';
import * as config from 'config';
import * as format from 'format';

const logger = Logger.getLogger('database');

// 连接池
let pool: mysql.Pool = null;
// 初始化连接池
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

export async function queryRows(sql: string, values?: any[]): Promise<any[]> {
    let promise : Promise<any[]> = new Promise( (resolve, reject) => {
        pool.query(sql, values, function(error, results: any[], fields) {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
    return promise;
}

export async function insertRows(sql: string, values?: any[]): Promise<{affectedRows: number, insertId: number}> {
    let promise: Promise<{affectedRows: number, insertId: number}> = new Promise( (resolve, reject) => {
        pool.query(sql, values, function(error, results: {affectedRows: number, insertId: number}, fields) {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);    
            }
        })
    });
    return promise;
}

export async function updateRows(sql: string, values?: any[]): Promise<{affectedRows: number}> {
    let promise: Promise<{affectedRows: number}> = new Promise( (resolve, reject) => {
        pool.query(sql, values, function(error, results: {affectedRows: number}, fields) {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);    
            }
        })
    });
    return promise;
}

export async function deleteRows(sql: string, values?: any[]): Promise<{affectedRows: number}> {
    let promise: Promise<{affectedRows: number}> = new Promise( (resolve, reject) => {
        pool.query(sql, values, function(error, results: {affectedRows: number}, fields) {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                resolve(results);    
            }
        })
    });
    return promise;
}

init();
