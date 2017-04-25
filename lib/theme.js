const fs = require('fs');

const variableStr = fs.readFileSync(`${__dirname}/styles/variable.less`, 'utf8');
const arr = variableStr.split('\n');
const obj = {};
arr.forEach((item) => {
  const keyValueArr = item.split(':');
  if (keyValueArr[0] && keyValueArr[0].indexOf('@') === 0) {
    const val = keyValueArr[1].trim().replace(/;.*$/, '');
    obj[keyValueArr[0].trim()] = val
  }
})
module.exports = () => {
  return obj
}
