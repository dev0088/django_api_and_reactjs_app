import * as types from '../actions/actionTypes';

const initialState = {
  isRegistered: false,
  isFetching: false,
  errorMessage: false
};

export default function register(state = initialState, action) {
  // console.log('=== register, state:', action, state)
  switch(action.type) {
    // case types.REGISTER.REQUEST:
    //   return Object.assign({}, state, {
    //     isFetching: true,
    //     isRegistered: false,
    //     errorMessage: false
    //   });
    case types.REGISTER.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: true,
        failure: false,
				errorMessage: false,
        userId: action.userId,
      });
    case types.REGISTER.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: false,
        failure: true,
        errorMessage: action.payload.response[Object.keys(action.payload.response)[0]][0],
      });
    case types.REGISTER.INIT:
      return Object.assign({}, state, {
        isRegistered: false,
        isFetching: false,
        errorMessage: false
      });
    default:
      return state;
  }
}
