import Axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import moment from 'moment';
import { Codes } from './Codes';
import jsonBig from 'json-bigint';

export async function confirm(context: any, message: string, title?: string) {
    try {
        let result = await context.$confirm(message, title, { type: 'warning' });
        return true;
    } catch (e) {
        console.log(e);
    }
    return false;
};

export async function validateForm(thisForm: any) {
    let promise = new Promise((resolve, reject) => {
        thisForm.validate((valid: boolean) => {
            resolve(valid);
        });
    });
    return promise;
};

export async function doDownload(method: string, url: string, data?: any) {
    let promise = new Promise((resolve, reject) => {
        let config: any = {
            method: method,
            url: url,
            data: data,
            responseType: 'blob'
        };
        Axios.request(config).then(function(res: any) {
            if (res.data.type === 'application/octet-stream' || res.data.type === 'application/x-pkcs12') {
                let blob = new Blob([res.data], { type: res.headers['content-type'] });
                let filename = res.headers['content-disposition'].match(/filename="(.*)"/)[1];
                let downloadElement = document.createElement('a');
                let href = window.URL.createObjectURL(blob); // 创建下载的链接
                downloadElement.href = href;
                downloadElement.download = filename; // 下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); // 点击下载
                document.body.removeChild(downloadElement); // 下载完成移除元素
                window.URL.revokeObjectURL(href); // 释放掉blob对象
                resolve({ success: true });
            } else if (res.data.type === 'application/json') {
                resolve(res.data);
            }
        }).catch(function(error: any) {
            console.log(error);
            reject(error);
        });
    });
    return promise;
}

export async function axiosAction(context: any, method: string, url: string, data?: any, headers?: any): Promise<any> {
    try {
        let config: any = { method, url, data };
        if (headers) {
            config = { headers, ...config };
        }
        config.transformResponse = [function(data: any) {
            return jsonBig.parse(data);
        }];
        let result: any = await Axios.request(config);

        if (!result.data) { // || !result.data.code
            return new Promise((resolve) => {
                resolve({ success: false, message: '执行HTTP请求失败。返回信息不正确。' });
            });
        }
        const code = result.data.code;
        if (code && (code === Codes.INVALID_ACCESS_TOKEN.code || code === Codes.EXPIRED_TOKEN.code)) { // Token无效或者超时
            localStorage.removeItem('TOKEN');
            localStorage.removeItem('user');
            await confirmRelogin('当前登录状态无效，请重新登录！');
            context.$router.push({ path: '/login' });
            return new Promise((resolve) => {
                resolve({ success: false, message: '' });
            });
        }
        return new Promise((resolve) => {
            resolve(result.data);
        });
    } catch (e) {
        console.log('Error happened when calling Axios-' + method);
        console.log(e);
        const ret = { success: false, message: '执行HTTP请求失败。' };
        if (e.status) {
            ret.message = ret.message + 'HTTP返回码：' + e.status;
        }
        return new Promise((resolve) => {
            resolve(ret);
        });
    }
}

export async function doPost(context: any, url: string, data?: any) {
    let result = await axiosAction(context, 'POST', url, data);
    return result;
}

export async function doGet(context: any, url: string) {
    let result = await axiosAction(context, 'GET', url);
    return result;
}

export async function doDelete(context: any, url: string, data?: any) {
    let result = await axiosAction(context, 'DELETE', url, data);
    return result;
}

export async function doPut(context: any, url: string, data?: any) {
    let result = await axiosAction(context, 'PUT', url, data);
    return result;
}

export async function doUpload(context: any, url: string, data: any) {
    let result = await axiosAction(context, 'POST', url, data, { 'Content-Type': 'multipart/form-data' });
    return result;
}

export async function showWarning(message: string, title?: string) {
    if (!title) {
        title = '警告';
    }
    Message({ type: 'warning', message, duration: 5000 });
}

export async function showInfo(message: string, title?: string) {
    if (!title) {
        title = '通知';
    }
    Message({ type: 'info', message, duration: 5000 });
};

export async function showSuccess(message: string, title?: string) {
    if (!title) {
        title = '通知';
    }
    Message({ type: 'success', message, duration: 5000 });
};

export async function showError(message: string, title?: string) {
    if (!title) {
        title = '通知';
    }
    Message({ type: 'error', message, duration: 5000 });
};

export async function messageInfo(message: string, title?: string) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!title) {
                title = '通知';
            }
            MessageBox.alert(message, title, {
                confirmButtonText: '确认',
                callback: (action: any) => {
                    console.log(action);
                    resolve('confirmed');
                }
            });
        }, 1000);
    });
    return promise;
}

export async function confirmRelogin(message: string, title?: string) {
    if (!title) {
        title = '错误';
    }
    const promise = new Promise((resolve, reject) => {
        MessageBox.alert(message, {
            type: 'error',
            title,
            confirmButtonText: '重新登录',
            callback: (action: any) => {
                console.log(action);
                resolve('confirmed');
            }
        });
    });
    return promise;
};

export function formatDateTimeString(source: Date, formatStr: string) {
    if (!formatStr) return '';
    if (source) { return moment(source).format(formatStr); } else { return ''; }
};

export function formatDateString(source: Date) {
    var format = 'YYYY-MM-DD HH:mm:ss';
    if (source) { return moment(source).format(format); } else { return ''; }
};

export function formatTimeString(source: Date) {
    var format = 'HH:mm:ss';
    if (source) { return moment(source).format(format); } else { return ''; }
};

export function formatUnixTimestamp(source: string) {
    var format = 'YYYY-MM-DD HH:mm:ss';
    if (source) { return moment(Number(source)).format(format); } else { return ''; }
}

// 清空element表单校验信息
export function clearValidateForm(formObj:any) {
    if (formObj) {
        formObj.clearValidate();
    }
}

export function getLocal() {
    return localStorage.getItem('LANG') || window.navigator.language;
}

export function urlEncode(param:any) {
    if (param == null) return '';
    let paramStr = '';
    for (const key in param) {
        if (param.hasOwnProperty(key)) {
            const element = param[key];
            paramStr += key + '=' + element + '&';
        }
    }
    return paramStr;
};

export function queryFormWrapper(queryForm: any) {
    let param = '';
    for (let key in queryForm) {
        if (queryForm[key] || queryForm[key] === 0) {
            param = `${param}&${key}=${encodeURI(queryForm[key])}`;
        }
    }
    return param;
}

export function formatCurrency(amount: number) {
    let num = amount.toString();

    for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
    }

    return '￥' + num;
}

export function blobToString(blob: any) {
    return new Promise((resolve, reject) => {
        try {
            let reader: any = new FileReader();
            reader.onload = function() {
                resolve(reader.result);
            };
            reader.onerror = function() {
                resolve(false);
            };
            reader.readAsText(blob);
        } catch (e) {
            resolve(false);
        }
    });
}
