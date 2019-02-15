import * as types from 'actions/actionTypes';

const initialState = {
  value: null
};

export default (state=initialState, action) => {
  switch(action.type) {
    case types.SET_SELECTED_PROFILE:
      localStorage.setItem('selectedProfile', JSON.stringify({
          ...action.payload.selectedProfile
        })
      );
      return {
        value: action.payload.selectedProfile
      };
    default:
      return state;
  }
};