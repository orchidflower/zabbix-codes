import * as Redis from 'redis';
import * as config from 'config';
import * as format from 'format';
import * as Logger from './logger';

const logger = Logger.getLogger('cache');

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
        logger.info(format.vsprintf('Redis [%s:%s/%s] is connected and ready for use.', [redisConfig.host, redisConfig.port, redisConfig.database]));
    });
}

init();

export async function store(key: string, value: any) {

}

export async function storeTtl(key: string, value: any, ttlInSeconds: number) {
    let promise = new Promise((resolve, reject) => {
        redisClient.setex(key, ttlInSeconds, JSON.stringify(value), function (err, res) {
            if (err!=null) {
                logger.error('Failed to store key: %s, value: %s', key, value, err);
                reject('Failed to store key ' + err);
            } else {
                logger.debug(res);
                resolve(res);
            }
        })
    });
    return promise;
}

export async function load(key: string) {
    let promise = new Promise((resolve: any, reject: any) => {
        redisClient.get(key, function(err, res) {
            if (err!=null) {
                logger.error('Failed to load key: %s.', key, err);
                reject('Failed to load key ' + err);
            } else {
                logger.debug(res);
                resolve(JSON.parse(res));
            }
        });
    });

    return promise;
}

export async function remove(key: string) {
    let promise = new Promise((resolve: any, reject: any) => {
        redisClient.del(key, function(err, res) {
            if (err!=null) {
                logger.error('Failed to load key: %s.', key, err);
                reject('Failed to load key ' + err);
            } else {
                logger.debug(res);
                resolve(res);
            }
        });
    });

    return promise;
}