export const Codes = {
    // 成功返回码（1-100）
    SUCCESS: { code: '100', message: '成功' },
    NEED_TWO_STEP: { code: '101', message: '需要两步认证' },

    // 特殊业务定义区 900-949
    // 9xx 微信相关错误
    WEIXIN_API_ERROR: { code: '900', message: '微信API调用错误' },
    OPENID_NOT_FOUND: { code: '901', message: '当前微信未注册用户' },
    OPENID_REGISTERED: { code: '902', message: '当前微信用户已注册过手机' },

    // 公共错误区 950-999
    // 98x TOKEN相关错误
    INVALID_ACCESS_TOKEN: { code: '980', message: '无效的访问凭据' },
    EXPIRED_TOKEN: { code: '981', message: '访问凭据已失效' },
    NO_ACCESS_RIGHT: { code: '982', message: '没有访问权限' }
};
