"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mustache = require("mustache");
const fs = require("fs");
const path = require("path");
let views = new Map();
async function getTemplate(fn) {
    return fs.readFileSync(fn, {
        encoding: 'utf8'
    });
}
async function listFiles(folder) {
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
    let files = await listFiles(dir);
    for (let i = 0; i < files.length; i++) {
        let fn = path.join(dir, files[i]);
        if (fn.endsWith('.mustache')) {
            let content = await getTemplate(fn);
            console.log(files[i]);
            views.set(files[i], content);
        }
    }
}
(async () => {
    init();
})();
function renderHtml(fn, data) {
    let template = views.get(fn);
    console.log(template);
    return Mustache.render(template, data);
}
exports.renderHtml = renderHtml;
