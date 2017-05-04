##yoyo

准备 yoyo-cli
npm install -S git+http://git.eju-inc.com/shihui-ued/yoyo.git
#   或者以ssh的方式
npm install -S git+ssh://git@git.eju-inc.com:shihui-ued/yoyo.git

基于react 的前端快速开发脚手架

公开暴露

utils

components

models=> only constants



期望调用方式为

初始化

`
import Yoyo from 'yoyo'
const yoyo = new Yoyo('FC')
yoyo.add(module)
yoyo.start('#root');
`

