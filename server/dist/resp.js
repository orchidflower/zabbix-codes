"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildSuccess(data) {
    let ret = { success: true, data: data };
    return ret;
}
exports.buildSuccess = buildSuccess;
;
function returnSuccess(ctx, data) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = buildSuccess(data);
}
exports.returnSuccess = returnSuccess;
function returnResponse(ctx, response) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = response;
}
exports.returnResponse = returnResponse;
