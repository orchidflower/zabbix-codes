var co = require('co');
var wrapper = require('co-redis');
var log4js = require('log4js');
var config = require('config');
let logger = log4js.getLogger('cache');
var format = require('format');


var redisClient = null;
var redisCo = null;

var PREFIX_CODE = "ZCODES_";

function init() {
    var redisConfig = config.get("redis");
    var options = {
        host: redisConfig.host,
        port: redisConfig.port,
        user: redisConfig.user,
        password: redisConfig.password,
        db: redisConfig.database
    };
    redisClient = require('redis').createClient(options);
    redisClient.on("error", function (err) {
        console.log("Error " + err);
    });
    redisClient.on("ready", function() {
        redisCo = wrapper(redisClient);
        logger.debug(format.vsprintf('Redis [%s:%s/%s] is connected and ready for use.', [redisConfig.host, redisConfig.port, redisConfig.database]));
    });
}

init();

exports.loadCode = function *(code) {
    let obj = yield redisCo.get(PREFIX_CODE+code);
    console.log(obj);
    if (!obj)
        return null;
    return JSON.parse(obj);
};

exports.storeCode = function *(code, obj) {
    yield redisCo.setex(PREFIX_CODE+code, 30*60, JSON.stringify(obj));     // 30 minutes
};