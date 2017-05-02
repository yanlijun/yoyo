import dva from 'dva';
import moment from 'moment';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import { message } from 'antd';
import 'nprogress/nprogress.css'
import 'font-awesome/css/font-awesome.css'
import { Router, browserHistory, IndexRoute, Link } from 'dva/router';
import './lib/styles/common.less';
import { RequestError } from './request'
import layoutModel from './lib/models/layout'
import Layout from './lib/layouts/standard';
import Home from './lib/routes/home'
import Error from './lib/routes/error'

moment.locale('zh-cn');
const cached = {}
// 1. Initialize
class Yoyo {
  registerModel=(obj) => {
    const model = obj.default || obj;
    if (!cached[model.namespace]) {
      this.app.model(model);
      cached[model.namespace] = 1;
    }
  }

  add(module) {
    this.childRoutes.splice(0, 0, ...module(this.app, this.registerModel));
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
        <Router history={history} routes={routes} />
      )
    });
    this.app.start(root)
  }

  model(model) {
    this.app.model(model);
  }

  childRoutes = [
    {
      path: '*',
      name: 'error',
      component: Error,
    },
  ]

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
