import React, {PropTypes} from 'react';
import {Router, Route, IndexRoute, Link} from 'dva/router';
import 'moment/locale/zh-cn';
import Layout from './layouts/standard';
import Home from './routes/home'
import Error from './routes/error'

const cached = {};

export default function ({history, app}) {
  console.log('************init************')
  let childRoutes = [];

  function registerModel(obj) {
    let model=obj.default||obj;
    if (!cached[model.namespace]) {
      app.model(model);
      cached[model.namespace] = 1;
    }
  }

  childRoutes.push({
    path: '*',
    name: 'error',
    component: Error,
  })
  const routes = [
    {
      path: '/',
      component: Layout,
      indexRoute: {
        component: Home
      },
      childRoutes: childRoutes,
    },
  ]
  return (
    <Router history={history} routes={routes}/>
  );
}
