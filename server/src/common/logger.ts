import * as log4js from 'log4js';

/**
 * 将logger独立成一个模块是为了保证初始化最先执行。
 * 在app.ts中首先import该模块的时候会进行模块初始化，并且先于其他模块初始化。
 * 
 * 如果直接将代码写在app.ts中，则初始化的时机会在其他import的模块之后。
 */

// 配置文件格式参考下面的代码：
// 注意：如果getLogger指定的category名字没有在配置中定义，则遵循default这个cateogry的规则
// initialize log4js
// log4js.configure({
//     appenders: {
//       cheeseLogs: { type: 'file', filename: 'cheese.log' },
//       console: { type: 'console' }
//     },
//     categories: {
//       default: { appenders: ['console'], level: 'error' },
//       cheese: { appenders: ['cheeseLogs'], level: 'error' },
//       another: { appenders: ['console'], level: 'trace' },
//       database: {appenders: ['console'], level: 'trace'},
//       default: { appenders: ['console'], level: 'trace' }
//     }
//   });
// console.log('Logger is initialized successfully.');


function init() {
    log4js.configure('./config/log4js.conf.json');
    let logger = log4js.getLogger();
    logger.info('Logger is initialized successfully.');
}

init();

export function getLogger(category: string) {
    return log4js.getLogger(category);
}
