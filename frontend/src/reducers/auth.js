// import * as auth from '../actions/auth'
import * as types from '../actions/actionTypes';
import jwtDecode from 'jwt-decode';

const initialState = {
  access: false,
  errors: false,
	isAuthenticated: false,
}

export default (state=initialState, action) => {
	// console.log('=== action, state:', action, state)
  switch(action.type) {
		case types.LOGIN.REQUEST:
      return {
        access: {},
        errors: false,
				isAuthenticated: false,
    }
    case types.LOGIN.SUCCESS:
      return {
        access: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        },
        errors: false,
				isAuthenticated: true,
    }
    case types.TOKEN.RECEIVED:
      return {
        ...state,
        access: {
          token: action.payload.token,
          ...jwtDecode(action.payload.token)
        }
      }
    case types.LOGIN.FAILURE:
    case types.TOKEN.FAILURE:
      return {
         access: {},
         errors: action.payload.response || {'non_field_errors': action.payload.statusText},
				 isAuthenticated: false,
      }
		case types.LOGOUT.REQUEST:
		case types.LOGOUT.SUCCESS:
			return {
				access: {},
				errors: false,
				isAuthenticated: false
			}
		case types.LOGOUT.FAILURE:
			return {
				access: {},
				isAuthenticated: false,
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
  // console.log("refresh", jwtDecode(state.access.token));
  if (state.access && state.access.token)
  {
    let decode = jwtDecode(state.access.token);
    if (decode && decode.exp) {
      return 1000 * decode.exp - (new Date()).getTime() < 5000;
    }
    return true;
  }
  return true;
}

export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state)
}

export function errors(state) {
  return  state.errors
}
