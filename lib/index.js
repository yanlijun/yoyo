import dva from 'dva';
import moment from 'moment';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import { browserHistory } from 'dva/router';
import { message } from 'antd';
import 'nprogress/nprogress.css'
import 'font-awesome/css/font-awesome.css'
import './styles/common.less';
import { RequestError } from './utils/request'

moment.locale('zh-cn');
// 1. Initialize

export default function({}){
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

  app.model(require('./models/layout'));
  app.model(require('./models/constants'));

// 4. Router
  app.router(require('./router.jsx'));

  return app;
}
