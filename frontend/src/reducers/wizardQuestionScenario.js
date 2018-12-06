import * as types from '../actions/actionTypes';

const initialState = {
  init: true,
  isFetched: false,
  errorMessage: false,
  isFailure: false,
  value: null
};

export function getWizardQuestionScenario(state = initialState, action) {
  switch(action.type) {
    case types.WIZARD_QUESTION_SCENARIO.REQUEST:
      return Object.assign({}, state, {
        init: false,
        isFetched: false,
        isFailure: false,
        errorMessage: false,
        value: null
      });
    case types.WIZARD_QUESTION_SCENARIO.SUCCESS:
      return Object.assign({}, state, {
        init: false,
        isFetched: true,
        isFailure: false,
        failure: true,
        value: action.payload,
      });
    case types.WIZARD_QUESTION_SCENARIO.FAILURE:
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