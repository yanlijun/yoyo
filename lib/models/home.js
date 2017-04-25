export default {

  namespace: 'home',
  state: {
    annoucements: {},
  },
  effects: {},

  reducers: {
    init(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
}
