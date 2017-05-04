export const ACCOUNTSECURITYLEVEL = {
  1: {
    className: 'text-danger',
    text: '低',
  },
  2: {
    className: 'text-info',
    text: '中',
  },
  3: {
    className: 'text-success',
    text: '高',
  },
}
export const ACCOUNTSTATUS = {
  1: '正常',
  2: '冻结',
}

/**
 * 常用正则
 * @type {{TEL: RegExp, EMAIL: RegExp, IDCARD: RegExp}}
 */
/*eslint-disable */
export const REGEXP = {
  TEL: /^1[34578]\d{9}$/,
  EMAIL: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  IDCARD: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/,
  PKGVERSION:/^\d+(\.\d+){0,2}$/,
}
