import _ from 'lodash'
import request from '../utils/request'


const GLOBALSFIELDS = ['area']

export default {
  namespace: 'constants',
  state: {
    area: {},
  },
  effects: {
    * fetch({ payload }, { call, put, select }) {
      const constants = yield select((state) => {
        return state.constants
      });
      if (!constants[payload]) {
        yield put({
          type: payload,
        })
      }
    },
    /**
     * 省市区的数据
     * @param action
     * @param call
     * @param put
     */
    * area(action, { call, put }) {
      const re = yield call(request, '/p/oms/operate/community/AreaAll');
      const citys = {};
      function generateAreaMapAndList(items, index) {
        const list = [];
        const map = {};
        items.forEach((item) => {
          list.push({
            name: item.name,
            id: item.id,
          })
          if (index === 2) {
            citys[item.id] = item.name
          }
          if (item.list && item.list.length) {
            map[item.id] = generateAreaMapAndList(item.list, index + 1)
          }
        })
        return {
          list,
          map,
        }
      }
      const area = generateAreaMapAndList(re, 1)
      yield put({
        type: 'setField',
        field: 'area',
        payload: {
          ...area,
          citys,
        },
      })
    },
    /**
     * 小区的分类
     * @param action
     * @param call
     * @param put
     */
    * serviceClassifies(action, { call, put }) {
      const re = yield call(request, '/p/pass/api/categorys');
      yield put({
        type: 'setField',
        field: 'serviceClassifies',
        payload: re,
      })
    },
    /**
     * 组织架构
     * @param action
     * @param call
     * @param put
     */
    * organization(action, { call, put }) {
      const re = yield call(request, '/p/passport/v1/api/get_organization');
      const organizations = _.groupBy(re, item => item.parent_id);
      yield put({
        type: 'setField',
        field: 'organization',
        payload: organizations,
      })
    },
    * tradetype(action, { call, put }) {
      const re = yield call(request, '/p/operate/api/bankroll/tradetype');
      const arr = [];
      _.each(re, (val, key) => {
        arr.push({
          value: val,
          label: key,
        })
      })
      yield put({
        type: 'setField',
        field: 'tradetype',
        payload: {
          map: re,
          arr,
        },
      })
    },
     /** 渠道
     * @param action
     * @param call
     * @param put
     */
    * channel(action, { call, put }) {
      const re = yield call(request, '/p/pass/api/common/channels ');
      const channels = {};
      re.forEach((item) => {
        channels[item.id] = item.abbrev
      })
      yield put({
        type: 'setField',
        field: 'channels',
        payload: channels,
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      GLOBALSFIELDS.forEach((type) => {
        dispatch({
          type,
        })
      })
    },
  },
  reducers: {
    setField(state, { payload, field }) {
      return {
        ...state,
        [field]: payload,
      };
    },
  },
}
