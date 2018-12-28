import * as types from './actionTypes'

export function notify(open, type, message){
  return {
    type: types.GLOBAL_NOTIFICATION,
    payload: {
      open: open,
      type: type,
      message: message
    }
  }
}
