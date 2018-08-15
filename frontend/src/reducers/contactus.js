import * as types from '../actions/actionTypes';

const initialState = {
  isFetched: false,
  isFetching: false,
  errorMessage: false,
  value: {}
};

export default function contactUs(state = initialState, action) {
  switch(action.type) {
    case types.CONTACT_US.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        failure: false,
        errorMessage: false,
        value: action.payload,
      });
    case types.CONTACT_US.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        failure: true,
        errorMessage: action.payload.response,
      });
    case types.CONTACT_US.INIT:
      return Object.assign({}, state, {
        isFetched: false,
        isFetching: false,
        errorMessage: false,
        value: {}
      });
    default:
      return state;
  }
}
