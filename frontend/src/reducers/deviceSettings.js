import * as types from '../actions/actionTypes';

const initialSettings = {
  resolution: 1,
  frameRate: 0,
  bitRate: 0
};
export default (state=initialSettings, action) => {
	switch(action.type) {
    case types.DEVICE_SETTINGS_SAVE:
      return Object.assign({}, state, {
        resolution: action.resolution,
        frameRate: action.frameRate,
        bitRate: action.bitRate
      });
    default:
      return state;
  }
}