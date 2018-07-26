import * as types from './actionTypes'

export function setDeviceSettingsActions(payload){
  return {
    type: types.DEVICE_SETTINGS_SAVE,
    ...payload
  }
}
