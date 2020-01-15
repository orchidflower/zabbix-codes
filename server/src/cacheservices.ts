import * as Redis from 'redis';
import * as log4js from 'log4js';
import * as config from 'config';
import * as format from 'format';

const PREFIX_CODE = "ZCODES:";
const logger = log4js.getLogger('cache');

var redisClient: Redis.RedisClient = null;

function init() {
    if (redisClient !== null) {
        return;
    }
    var redisConfig: any = config.get("redis");
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
    redisClient.on("ready", function() {
        logger.debug(format.vsprintf('Redis [%s:%s/%s] is connected and ready for use.', [redisConfig.host, redisConfig.port, redisConfig.database]));
    });
}

init();

export async function loadCode(code: any) {
    let promise = new Promise((resolve: any, reject: any) => {
        redisClient.get(PREFIX_CODE + code, function(err, res) {
            if (err!=null) {
                reject('Failed to get code: ' + err);
            } else {
                resolve(JSON.parse(res));
            }
        });
    });

    return promise;
}

export async function storeCode(code: any, obj: any) {
    let promise = new Promise((resolve, reject) => {
        redisClient.setex(PREFIX_CODE + code, 30*60, JSON.stringify(obj), function (err, res) {
            if (err!=null) {
                reject('Failed to get code: ' + err);
            } else {
                resolve(res);
            }
        })
    });
    return promise;
}