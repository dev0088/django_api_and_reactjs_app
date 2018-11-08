import * as types from '../constants/client.constant'

const initState = {
  isFetching: false,
  value: {}
};

export const talentSearchReducer = (state = initState, action) => {
  switch (action.type) {
    case types.TALENT_SEARCH.REQUEST:
      console.log('request');
      return state;
    case types.TALENT_SEARCH.SUCCESS:
      console.log('success');

      state = {
        isFetching: true,
        value: Object.assign({}, JSON.parse(action.payload))
      };

      return state;
    case types.TALENT_SEARCH.FAILURE:
      console.log('failure');
      return state;
    default:
      return state;
  }
};

export const requestViewReducer = (state = initState, action) => {
  switch (action.type) {
    case types.REQUEST_VIEW.REQUEST:
      console.log('request');
    case types.REQUEST_VIEW.SUCCESS:
      if (action.payload) {
        state = {
          isFetching: true,
          value: Object.assign({}, JSON.parse(action.payload))
        };
      }
      return state;
    case types.REQUEST_VIEW.FAILURE:
      console.log('failure');
      return state;
    default:
      return state;
  }
};

export const searchViewReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SEARCH_VIEW.REQUEST:
      console.log('requested searchView');
      return state;
    case types.SEARCH_VIEW.SUCCESS:
      console.log(action.payload);
      return state;
    case types.SEARCH_VIEW.FAILURE:
      console.log('failure')
      return state;
    default:
      return state;
  }
};