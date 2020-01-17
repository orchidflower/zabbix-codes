import * as Koa from 'koa';

export function buildSuccess(data?: any) {
    let ret = {success: true, data: data };
    return ret;
};

export function returnSuccess(ctx: Koa.ParameterizedContext, data: any) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = buildSuccess(data);
}

export function returnResponse(ctx: Koa.ParameterizedContext, response: Object) {
    ctx.set('Content-Type', 'application/json');
    ctx.body = response;
}