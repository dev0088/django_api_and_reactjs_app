import * as types from './actionTypes'

export function registerRequest(
	userName,
  email,
  password,
  passwordConfirm,
  firstName,
  lastName,
  type
) {
  return {
    type: types.REGISTER.REQUEST,
		userName,
	  email,
	  password,
	  passwordConfirm,
	  firstName,
	  lastName,
	  type
  }
}

export function registerInit() {
  return {
    type: types.REGISTER.INIT
  }
}

export function registerSuccess(payload) {
  return {
    type: types.REGISTER.SUCCESS,
    ...payload
  }
}

export function registerFailure(err) {
  return {
    type: types.REGISTER.FAILURE,
    err
  }
}
