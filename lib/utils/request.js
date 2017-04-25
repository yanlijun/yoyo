import fetch from 'dva/fetch';
import formurlencoded from 'form-urlencoded';
import _ from 'lodash'
import { login, getRequestHost } from './utils'

export function RequestError(obj) {
  const { msg } = obj;
  this.name = 'RequestError';
  this.message = msg;
  this.stack = (new Error()).stack;
  this.context = obj;
}
RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} pathname       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(pathname, options = {}) {
  const url = getRequestHost() + pathname;
  options.credentials = options.credentials || 'include';
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((json) => {
      const { apistatus, result, status, data } = json;
      let re = result || data;
      let code;
      if (apistatus !== undefined) {
        if (apistatus === 1) {
          code = 200;
        } else {
          code = apistatus
        }
      } else if (status !== undefined) {
        if (status === 0) {
          code = 200;
        } else {
          code = status;
        }
      } else {
        code = json.meta && json.meta.code;
        //返回值可能没有状态啊
        if (code === undefined) {
          code = 200;
          re = json;
        }
      }

      if (code >= 200 && code < 300) {
        return re
      } else if (code === 401) {
        return login()
      }
      let msg = json.msg || (json.meta && json.meta.msg)
      const javaMsg = (re !== undefined && re.error_zh_CN) ? re.error_zh_CN : undefined
      msg = msg || javaMsg
      throw new RequestError({
        ...json,
        msg,
        code,
        result: re,
      })
    })
    .catch((err) => {
      throw err
    })
}

export function requestJson(url, body, options = {}) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options,
  })
}
export function requestForm(url, body, options = {}) {
  const str = formurlencoded(body);
  return request(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': str.length,
    },
    body: str,
    ...options,
  })
}

/**
 * 模拟浏览器请求
 * @param path
 * @param params
 * @param method
 */
export function simulateBrowserFormSubmit(path, params, target = '_self', method = 'post') {
  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', path);
  form.setAttribute('target', target);
  _.each(params, (val, key) => {
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', val);
    form.appendChild(hiddenField);
  })

  document.body.appendChild(form);
  form.submit();
}
