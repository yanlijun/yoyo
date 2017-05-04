import dva from 'dva';
import moment from 'moment';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import { message } from 'antd';
import 'nprogress/nprogress.css'
import 'font-awesome/css/font-awesome.css'
import { resolve } from 'path';
import { Router, browserHistory, IndexRoute, Link } from 'dva/router';
import './lib/styles/common.less';
import { RequestError } from './request'
import layoutModel from './lib/models/layout'
import Layout from './lib/layouts/standard';
import Home from './lib/routes/home'
import Error from './lib/routes/error'

moment.locale('zh-cn');
const cached = {}

//暂时放在window 里面，后续放到app 内部
window._matchPathMap = {}
//先设置一个默认值
window.$authNodes = [];
window.checkAuth = function (auth) {
  return window.$authNodes.indexOf(auth) > -1;
}
class Yoyo {
  childRoutes = [
    {
      path: '*',
      name: 'error',
      component: Error,
    },
  ]

  add(module, req) {
    const self = this;
    try {
      const router = req(`./${module}/router.js`);
      const routes = [];
      _.each(router, (val, key) => {
        //保存自动触发的action 数据
        if (val.actions) {
          window._matchPathMap[key] = val.actions;
        }
        if (val.model) {
          self.model(req(`./${module}/${val.model}`));
        }
        routes.push({
          path: key,
          getComponent(state, cb) {
            cb(null, req(`./${module}/${val.page}`));
          }
        })
      })
      this.childRoutes.splice(0, 0, ...routes);
    } catch (e) {
      throw e;
    }
  }

  start(root) {
    this.app.router(({ history, app }) => {
      const routes = {
        path: '/',
        component: Layout,
        indexRoute: {
          component: Home,
        },
        childRoutes: this.childRoutes,
      }
      return (
        <Router history={history} routes={routes}/>
      )
    });
    this.app.start(root)
    this.app._state.dispatch({
      type'layout/queryUser'
    })
  }

  model(obj) {
    const model = obj.default || obj;
    if (!cached[model.namespace]) {
      this.app.model(model);
      cached[model.namespace] = 1;
    }
  }


  constructor({ sysCode, domain }) {
    window.$config = {
      sysCode,
      domain,
    }

    const app = dva({
      history: browserHistory,
      onError(e) {
        message.error(e.message, /* duration */3);
        if (e instanceof RequestError) {
          console.error(e.context)
        }
        console.error(e)
      },
    });

    // 2. Plugins
    app.use(createLoading());

    app.use({
      onAction({ dispatch, getState }) {
        return next => (action) => {
          if (action.type === '@@router/LOCATION_CHANGE') {
            next({
              type: 'layout/routeChange',
              payload: action.payload,
            })
          }
          next(action);
        }
      },
    })
    // 3. Model
    app.model(layoutModel);
    // 4. Router

    this.app = app;
  }


}
export default Yoyo;
