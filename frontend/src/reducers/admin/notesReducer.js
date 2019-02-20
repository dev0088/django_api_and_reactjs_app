import * as types from 'actions/actionTypes';

const initialState = {
  isFetched: false,
  isFetching: false,
  failure: false,
  errorMessage: false,
  value: {}
};

export default function notesReducer(state = initialState, action) {
  switch(action.type) {
    case types.SEARCH_NOTES.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        failure: false,
        errorMessage: false,
        value: action.payload,
      });
    case types.SEARCH_NOTES.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        failure: true,
        errorMessage: action.payload
      });
    case types.SEARCH_NOTES.INIT:
      return Object.assign({}, state, {
        isFetched: false,
        isFetching: false,
        errorMessage: false,
        failure: false,
        value: {}
      });
    default:
      return state;
  }
}
