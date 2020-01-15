"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("redis");
const log4js = require("log4js");
const config = require("config");
const format = require("format");
const PREFIX_CODE = "ZCODES:";
const logger = log4js.getLogger('cache');
var redisClient = null;
function init() {
    if (redisClient !== null) {
        return;
    }
    var redisConfig = config.get("redis");
    var options = {
        host: redisConfig.host,
        port: redisConfig.port,
        user: redisConfig.user,
        password: redisConfig.password,
        db: redisConfig.database
    };
    redisClient = Redis.createClient(options);
    redisClient.on("error", function (err) {
        console.log("Error " + err);
    });
    redisClient.on("ready", function () {
        logger.debug(format.vsprintf('Redis [%s:%s/%s] is connected and ready for use.', [redisConfig.host, redisConfig.port, redisConfig.database]));
    });
}
init();
async function loadCode(code) {
    let promise = new Promise((resolve, reject) => {
        redisClient.get(PREFIX_CODE + code, function (err, res) {
            if (err != null) {
                reject('Failed to get code: ' + err);
            }
            else {
                resolve(JSON.parse(res));
            }
        });
    });
    return promise;
}
exports.loadCode = loadCode;
async function storeCode(code, obj) {
    let promise = new Promise((resolve, reject) => {
        redisClient.setex(PREFIX_CODE + code, 30 * 60, JSON.stringify(obj), function (err, res) {
            if (err != null) {
                reject('Failed to get code: ' + err);
            }
            else {
                resolve(res);
            }
        });
    });
    return promise;
}
exports.storeCode = storeCode;
