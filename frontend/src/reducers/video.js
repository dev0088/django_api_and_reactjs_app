import * as types from '../actions/actionTypes';

const initialState = {
  init: true,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: []
};

export default function videoQuestions(state = initialState, action) {
  // console.log("==video==", action.type);
  switch(action.type) {
    case types.VIDEO_QUESTION.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetched: true,
        isFailure: false,
        errorMessage: false,
        value: action.payload,
      });
    case types.VIDEO_QUESTION.FAILURE:
      return Object.assign({}, state, {
        init: false,
        isFetched: false,
        failure: true,
        errorMessage: action.payload,
      });
    case types.VIDEO_QUESTION.INIT:
      return Object.assign({}, state, {
        init: true,
        isFetched: false,
        errorMessage: false,
        isFailure: false,
        value: []
      });
    default:
      return state;
  }
}

const initialSettingState = {
  init: true,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: []
};

export function videoSettings(state = initialSettingState, action) {
  // console.log("==videoSetting==", action.type);
  switch(action.type) {
    case types.VIDEO_SETTINGS.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetched: true,
        isFailure: false,
        errorMessage: false,
        value: action.payload,
      });
    case types.VIDEO_SETTINGS.FAILURE:
      return Object.assign({}, state, {
        init: false,
        isFetched: false,
        failure: true,
        errorMessage: action.payload,
      });
    case types.VIDEO_SETTINGS.INIT:
      return Object.assign({}, state, {
        init: true,
        isFetched: false,
        errorMessage: false,
        isFailure: false,
        value: []
      });
    default:
      return state;
  }
}
