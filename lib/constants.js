
export const PAGESIZE = 10;


/**
 * 账户状态
 * @type {{1: string, 2: string}}
 */
export const ACCOUNTSTATUS = {
  1: '正常',
  2: '冻结',
}

/**
 * 卡类型
 * @type {{1: string}}
 */
export const CARDTYPE = {
  1: '储蓄卡',
}
/**
 * 账户的安全级别
 * @type {{1: string, 2: string, 3: string}}
 */
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

/**
 * 交易状态
 * @type {{1}}
 */
export const TRANSACTIONSTATUS = {
  1: '交易成功',
  0: '交易失败',
}

/**
 * 常用正则
 * @type {{TEL: RegExp, EMAIL: RegExp, IDCARD: RegExp}}
 */
/*eslint-disable */
export const REGEXP = {
  TEL: /^1[34578]\d{9}$/,
  EMAIL: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g,
  IDCARD: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/g,
}
/**
 * 到家服务类型（订单类型）
 */
export const RECONCILIATIIONHOMETYPE = {
  210: '家庭保洁',
  220: '洗衣洗鞋',
  230: '家电清洗',
  240: '家电维修',
  250: '手机维修',
  260: '推拿按摩',
  270: '家庭维修'
}
/**
 * 商品服务类型（订单类型）
 */
export const RECONCILIATIIONGOODSTYPE = {
  110: '时速达',
  120: '每日鲜',
  130: '特卖',
  140: '福利'
}
