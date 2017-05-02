import _ from 'lodash';
import { Select, TreeSelect } from 'antd'
import qs from 'qs';
import moment from 'moment'

const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

export function login() {
  if (location.hostname.indexOf(window.$config.domain) !== 0) {
    location.href = `http://test.passport.17shihui.com?returnUrl=${location.href}`;
  } else {
    location.href = `http://passport.17shihui.com?returnUrl=${location.href}`;
  }
}

export function logout() {
  if (location.hostname.indexOf(window.$config.domain) !== 0) {
    location.href = `http://test.passport.17shihui.com/index/logout?returnUrl=${location.href}`;
  } else {
    location.href = `http://passport.17shihui.com/index/logout?returnUrl=${location.href}`;
  }
}

export function generateSelectOption(obj) {
  const arr = [];
  _.map(obj, (val, key) => {
    arr.push(<Option key={key} value={key}>{val}</Option>)
  })
  return arr;
}
export function toArrayByName(obj) {
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push({
      id: key,
      name: value,
    })
  }
  return arr;
}

export function generateSelectOptionByName(items) {
  return (items || []).map((item) => {
    return <Option value={`${item.id}`} key={item.id}>{item.name}</Option>
  })
}

export function generateTreeNodeByName(item, map) {
  const arr = map[item.id];
  if (arr && arr.length) {
    return (
      <TreeNode key={`${item.id}`} value={`${item.id}`} title={item.name}>
        {
          arr.map((sub) => {
            return generateTreeNodeByName(sub, map)
          })
        }
      </TreeNode>
    )
  }
  return <TreeNode key={`${item.id}`} value={`${item.id}`} title={item.name} isLeaf />
}

/**
 * 金额格式化
 * @param money
 * @returns {string}
 */
export function moneyFormat(money = '') {
  const num = parseFloat(money);
  const str = isNaN(num) ? '0.00' : num.toFixed(2);
  const decimal = str.substring(str.indexOf('.'), str.length);
  // const str = money.toString();
  const length = str.length - decimal.length;
  const loop = Math.ceil(length / 3);
  let re = '';
  for (let i = 1; i <= loop; i++) {
    if (length - i * 3 > 0) {
      re = `,${str.substr(length - (i * 3), 3)}${re}`;// eslint-disable-next-line
    } else {

      re = `,${str.substr(0, length - (i * 3) + 3)}${re}`; // eslint-disable-next-line
    }
  }
  if (re[0] === ',') {
    re = re.substr(1);
  }
  return re + decimal;
}

/**
 * 银行卡format
 * @param card
 */
export function cardFormat(card = '') {
  let str = card.toString();
  const arr = [];
  while (str.length > 0) {
    arr.push(str.slice(0, 4))
    str = str.slice(4);
  }
  return arr.join(' ');
}

export function byKeyGetName(obj, k) {
  let name;
  for (const [key, value] of Object.entries(obj)) {
    if (k === key) {
      name = value
    }
  }
  return name;
}

/**
 * 将promise 变成异步
 * @param promise
 * @param cb 第一个返回值是err 第二个是返回值
 */
export async function promiseToSync(promise, cb) {
  try {
    const re = await promise
    cb(null, re)
  } catch (e) {
    cb(e)
  }
}
/**
 * 是否生产环境
 * @returns {boolean}
 */
export function isProdEnv() {
  return location.hostname.indexOf(window.$config.domain) === 0;
}

/**
 * 获取请求的域名
 * @returns {string}
 */
export function getRequestHost() {
  return isProdEnv() ? 'http://node.17shihui.com' : 'http://test.node.17shihui.com'
}

/**
 * 增强版的qs。主要处理moment 对象
 */
export function qsEnhance(model) {
  const params = {}
  _.each(model, (val, key) => {
    const type = typeof val;
    if (type === 'string') {
      params[key] = val;
    } else if (type === 'boolean') {
      params[key] = parseInt(type);
    } else if (moment.isMoment(val)) {
      params[key] = val.format('YYYY-MM-DD');
    } else {
      params[key] = val;
    }
  })
  return qs.stringify(params);
}
