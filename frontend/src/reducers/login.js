import * as types from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  access_token: '',
  token_type: '',
  expires_in: 0,
  userName: '',
  errorMessage: false,
	auth
};

export default function auth(state = initialState, action) {
  switch(action.type) {
    case types.LOGIN.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        errorMessage: false
      });
    case types.LOGIN.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        failure: false,
        access_token: action.access_token,
        userName: action.userName,
				token_type: action.token_type
      });
    case types.LOGIN.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        errorMessage: action.err
      });
    case types.LOGIN.INIT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isFetching: false,
        access_token: '',
        token_type: '',
        expires_in: 0,
        userName: '',
        errorMessage: false
      });
		case types.LOGIN_FROM_REGISTRATION.REQUEST:
			console.log('==== reducer: LOGIN_FROM_REGISTRATION.REQUEST')
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        errorMessage: false,
				fromRegistration: true
      });
    case types.LOGIN_FROM_REGISTRATION.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        failure: false,
        access_token: action.access_token,
        userName: action.userName
      });
    case types.LOGIN_FROM_REGISTRATION.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        errorMessage: action.err
      });
    case types.LOGIN_FROM_REGISTRATION.INIT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isFetching: false,
        access_token: '',
        token_type: '',
        expires_in: 0,
        userName: '',
        errorMessage: false
      });
    case types.LOGOUT.REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isAuthenticated: false,
				errorMessage: false
			});
    default:
      return state;
  }
}
