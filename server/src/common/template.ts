import * as Mustache from 'mustache';
import * as fs from 'fs';
import * as path from 'path';
import * as Logger from './logger';

const templatePath = path.join(__dirname, '../../views');
const templateSuffix = '.mustache';

let logger = Logger.getLogger('template');

// 全局缓存，缓存所有的template，使用模板文件名作为键值
let views = new Map<string, string>();

async function getTemplate(fn: any) {
    return fs.readFileSync(fn, {
        encoding: 'utf8'
    });
}

async function listFiles(folder: string) {
    let promise = new Promise((resolve, reject) => {
        fs.readdir(folder, function (err, files) {
            if (err) {
                reject('Failed to load folder.' + err);
                return;
            }
            resolve(files);
        });
    });
    return promise;
}

(async function init() {
    let files: any = await listFiles(templatePath);
    for (let i=0; i<files.length; i++) {
        let fn = path.join(templatePath, files[i]);
        if (fn.endsWith(templateSuffix)) {
            let content = await getTemplate(fn);
            logger.info('Loaded template file: %s', files[i]);
            views.set(files[i], content);
        }
    }
})();

export function renderHtml(ctx: any, fn: string, data: any) {
    if (!fn.endsWith(templateSuffix)) {
        fn = fn + templateSuffix;
    }
    let template = views.get(fn);
    if (!template) {
        template = views.get('error' + templateSuffix);
        ctx.set('Context-Type', 'application/html');
        ctx.body = Mustache.render(template, data);    
    } else {
        ctx.set('Context-Type', 'application/html');
        ctx.body = Mustache.render(template, data);    
    }
}