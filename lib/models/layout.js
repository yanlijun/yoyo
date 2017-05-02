import _ from 'lodash';
import { queryUserInfo, queryMenu, queryAllSystems } from '../services/layout'
import { login } from '../../utils'

function getMenuMap(map, menus, parent) {
  menus.forEach((item) => {
    const obj = {
      code: item.code,
      name: item.name,
      url: item.url,
      isMenu: item.is_menu === '1',
      parent,
    };
    if (item.submenu && item.submenu.length) {
      getMenuMap(map, item.submenu, obj)
    } else {
      map[item.code] = obj;
    }
  })
  return map;
}
function resetMenus(menus) {
  const arr = _.filter(menus, (item) => {
    return item.is_active === '1';
  })
  arr.forEach((item) => {
    item.isMenu = item.is_menu === '1';
    if (item.submenu && item.submenu.length) {
      item.submenu = resetMenus(item.submenu);
      //判断submenu 是否为buttons
      if (item.submenu[0].is_button === '1') {
        item.buttons = item.submenu;
        delete item.submenu;
      }
    }
  })
  return arr;
}
function getAllAuthNodes(menus, arr = []) {
  _.each(menus, (item) => {
    if (!item.isMenu) {
      arr.push(item.code)
    }
    const subArr = item.submenu || item.buttons;
    if (subArr && subArr.length) {
      getAllAuthNodes(subArr, arr);
    }
  })
  return arr;
}
export default {

  namespace: 'layout',

  state: {
    collapsed: false,
    menus: [],
    menuMap: {},
    currentSystem: {},
    topMenus: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'queryUser',
      })
    },
  },
  effects: {
    * queryUser(action, { call, put }) {
      const user = yield call(queryUserInfo);
      //user 信息可能是过期了哦
      if (!user) {
        login()
        // throw new Error('授权信息已经过期了');
      }
      //用户信息保存在window中 方便其他地方调用user信息
      window.$user = user;//eslint-disable
      yield put({
        type: 'initUserInfo',
        payload: user,
      })
      const menus = yield call(queryMenu);
      resetMenus(menus);
      //获取全部的权限点
      window.$authNodes = getAllAuthNodes(menus)
      yield put({
        type: 'initMenus',
        payload: menus,
      })
      const topMenus = yield call(queryAllSystems);
      yield put({
        type: 'initTopMenus',
        payload: topMenus,
      })
    },
  },

  reducers: {
    toggleCollapsed(state) {
      const collapsed = !state.collapsed;
      return {
        ...state,
        collapsed,
        openKeys: collapsed ? [] : state.openKeys, //折叠的时候隐藏已经打开的keys
      }
    },
    initUserInfo(state, { payload }) {
      return {
        ...state,
        user: payload,
      }
    },
    routeChange(state, { payload }) {
      let currentMenu = _.find(state.menuMap, (val, key) => {
        return val.url === payload.pathname
      })
      const current = [];
      const openKeys = [];
      if (currentMenu) {
        current.push(currentMenu.code);
        while (currentMenu.parent) {
          openKeys.push(currentMenu.parent.code)
          currentMenu = currentMenu.parent;
        }
        return {
          ...state,
          current,
          openKeys,
        }
      }
      return state;
    },
    initMenus(state, { payload }) {
      const map = {};
      getMenuMap(map, payload);
      let currentMenu;
      for (const key in map) {
        if (map[key].url === location.pathname) {
          currentMenu = map[key];
        }
      }
      const current = [];
      const openKeys = [];
      if (currentMenu) {
        current.push(currentMenu.code);
        while (currentMenu.parent) {
          openKeys.push(currentMenu.parent.code)
          currentMenu = currentMenu.parent;
        }
      }
      return {
        ...state,
        menuMap: map,
        menus: payload,
        current,
        openKeys,
      }
    },
    initTopMenus(state, { payload }) {
      const currentSystem = payload.find((item) => {
        return item.code === window.$config.sysCode;
      })

      return {
        ...state,
        currentSystem,
        topMenus: payload,
      }
    },
    openMenu(state, action) {
      return {
        ...state,
        openKeys: action.payload,
      };
    },
  },
}
