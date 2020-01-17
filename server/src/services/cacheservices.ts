import * as Cache from '../common/cache';

const PREFIX_CODE = "ZCODES:";
const TTL_CODE = 30*60;

export async function loadCode(code: any) {
    return await Cache.load(PREFIX_CODE + code);
}

export async function storeCode(code: any, obj: any) {
    return await Cache.storeTtl(PREFIX_CODE + code, obj, TTL_CODE);
}

export async function removeCode(code: any) {
    return await Cache.remove(PREFIX_CODE + code);
}