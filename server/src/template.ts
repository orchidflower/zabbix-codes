import * as Mustache from 'mustache';
import * as fs from 'fs';
import * as path from 'path';

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

async function init() {
    let dir = path.join(__dirname, '../views');

    let files: any = await listFiles(dir);
    for (let i=0; i<files.length; i++) {
        let fn = path.join(dir, files[i]);
        if (fn.endsWith('.mustache')) {
            let content = await getTemplate(fn);
            console.log(files[i]);
            views.set(files[i], content);
        }
    }
}

(async() => {
    init();
})();

export function renderHtml(fn: string, data: any) {
    let template = views.get(fn);
    return Mustache.render(template, data);
}