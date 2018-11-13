import * as types from '../actions/actionTypes';

const initState = {
  isFetching: false,
  value: {}
};


const initialClientInfoState = {
  init: true,
  isFetching: false,
  isFailure: false,
  errorMessage: false,
  value: null
};

export const getCurrentClientInfo = (state = initialClientInfoState, action) => {
  switch(action.type) {
    case types.CLIENT_INFO.REQUEST:
      return Object.assign({}, state, {
        init: false,
        isFetching: true,
        isFailure: false,
        errorMessage: false,
        value: null
      });
    case types.CLIENT_INFO.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetching: false,
        isFailure: false,
        errorMessage: false,
        value: action.payload
      });
    case types.CLIENT_INFO.FAILURE:
      return Object.assign({}, state, {
        init: false,
        isFetching: false,
        isFailure: true,
        errorMessage: action.payload,
        value: null
      });
    default:
      return state;
  }
}

export const talentSearchReducer = (state = initState, action) => {
  switch (action.type) {
    case types.TALENT_SEARCH.REQUEST:
      return Object.assign({}, state, {
        init: false,
        isFetching: true,
        isFailure: false,
        errorMessage: false,
        value: null
      });
    case types.TALENT_SEARCH.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetching: false,
        isFailure: false,
        errorMessage: false,
        value: action.payload
      });
    case types.TALENT_SEARCH.FAILURE:
      return Object.assign({}, state, {
        init: false,
        isFetching: false,
        isFailure: true,
        errorMessage: action.payload,
        value: false
      });
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