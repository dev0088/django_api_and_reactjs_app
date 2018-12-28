import * as actionTypes from 'actions/actionTypes'

const initialState = {
  open: false,
  type: '',
  message: ''
};

export default (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.GLOBAL_NOTIFICATION:
      return {
        open: action.payload.open,
        type: action.payload.type,
        message: action.payload.message
      };
    default:
      return state
  }
}
