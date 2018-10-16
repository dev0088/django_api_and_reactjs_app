import * as types from '../actions/actionTypes';

const initialState = {
  init: true,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: null
};

export function getAllPositionTypes(state = initialState, action) {
  switch(action.type) {
    case types.ALL_POSITION_TYPES.REQUEST:
      return Object.assign({}, state, {
        init: false,
        isFetched: false,
        isFailure: false,
        errorMessage: false,
        value: null
      });
    case types.ALL_POSITION_TYPES.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetched: true,
        isFailure: false,
        failure: true,
        value: action.payload,
      });
    case types.ALL_POSITION_TYPES.FAILURE:
      return Object.assign({}, state, {
        init: true,
        isFetched: false,
        isFailure: true,
        errorMessage: action.payload,
        value: null
      });
    default:
      return state;
  }
}


const initialTalentPositionTypesState = {
  init: true,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: null
};

export function getTalentPositionTypes(state = initialTalentPositionTypesState, action) {
  switch(action.type) {
    case types.TALENT_POSITION_TYPES.REQUEST:
      return Object.assign({}, state, {
        init: false,
        isFetched: false,
        isFailure: false,
        errorMessage: false,
        value: null
      });
    case types.TALENT_POSITION_TYPES.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetched: true,
        isFailure: false,
        failure: true,
        value: action.payload,
      });
    case types.TALENT_POSITION_TYPES.FAILURE:
      return Object.assign({}, state, {
        init: true,
        isFetched: false,
        isFailure: true,
        errorMessage: action.payload,
        value: null
      });
    default:
      return state;
  }
}