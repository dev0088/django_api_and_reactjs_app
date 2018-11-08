import * as types from '../actions/actionTypes';
import defaultValue from '../constants/defaultValues';

const initialState = {
  isRegistered: false,
  isFetching: false,
  errorMessage: false,
  value: defaultValue.DEFAULT_SHIPTALENT_INFO
};

export default function shiptalentInfo(state = initialState, action) {
  // console.log("==shipTalent==", state, action);
  switch(action.type) {
    case types.SHIPTALENT_INFO.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: true,
        failure: false,
        errorMessage: false,
        value: action.payload,
      });
    case types.SHIPTALENT_INFO.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: false,
        failure: true,
        errorMessage: action.payload,
      });
    case types.SHIPTALENT_INFO.INIT:
      return Object.assign({}, state, {
        isRegistered: false,
        isFetching: false,
        errorMessage: false,
        value: defaultValue.DEFAULT_SHIPTALENT_INFO
      });
    default:
      return state;
  }
}
