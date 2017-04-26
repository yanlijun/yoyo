
export const PAGESIZE = 10;


export const APPTYPE = {
  shihui: '实惠',
  burter: '管家',
}

export const PLATFORMS = {
  android: '安卓',
  ios: 'IOS',
}
export const VERSIONSTATUS = {
  0: '未开启',
  1: '运行中',
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
