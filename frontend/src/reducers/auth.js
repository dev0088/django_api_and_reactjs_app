import jwtDecode from 'jwt-decode'
import * as auth from '../actions/auth'
import * as types from '../actions/actionTypes';

const initialState = {
  access: undefined,
  refresh: undefined,
	user: undefined,
  errors: {},
}

export default (state=initialState, action) => {
	console.log('=== action, state:', action, state)
  switch(action.type) {
    case types.LOGIN.SUCCESS:
      return {
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        },
        refresh: {
          token: action.payload.refresh,
          ...jwtDecode(action.payload.refresh)
        },
				user: {},
        errors: {}
    }
    case types.TOKEN.RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.access,
          ...jwtDecode(action.payload.access)
        }
      }
    case types.LOGIN.FAILURE:
    case types.TOKEN.FAILURE:
      return {
         access: undefined,
         refresh: undefined,
				 user: undefined,
         errors: action.payload.response || {'non_field_errors': action.payload.statusText},
      }
    default:
      return state
    }
}

export function accessToken(state) {
  if (state.access) {
    return  state.access.token
  }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
  }
  return true
}

export function refreshToken(state) {
  if (state.refresh) {
    return  state.refresh.token
  }
}

export function isRefreshTokenExpired(state) {
  if (state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
  }
  return true
}

export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state)
}

export function errors(state) {
  return  state.errors
}
