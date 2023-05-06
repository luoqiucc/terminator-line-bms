module.exports = {
    INNER_EXCEPTION: {
        status: 500,
        err_msg: '内部错误'
    },
    PARAMETER_ERROR: {
        status: 400,
        err_msg: '参数错误'
    },
    USER_NOT_FOUND: {
        status: 404,
        err_msg: '用户不存在'
    },
    POST_NOT_FOUND: {
        status: 404,
        err_msg: '帖子不存在'
    },
    FORM_EMPTY: {
        status: 400,
        err_msg: '表单有必填项为空'
    },
    EMAIL_FORMAT_ERROR: {
        status: 400,
        err_msg: '邮箱格式错误'
    },
    UID_FORMAT_ERROR: {
        status: 400,
        err_msg: 'UID格式错误'
    },
    TEXT_TO_LONG: {
        status: 400,
        err_msg: '文本过长'
    },
    EMAIL_EXIST: {
        status: 409,
        err_msg: '邮箱已存在'
    },
    AUTHENTICATION_FAILED: {
        status: 400,
        err_msg: '验证失败'
    },
    PERMISSION_DENIED: {
        status: 403,
        err_msg: '权限不足'
    },
    METHOD_NOT_ALLOWED: {
        status: 405,
        err_msg: '功能关闭'
    },
    TOKEN_INVALID: {
        status: 401,
        err_msg: 'Token无效'
    },
}