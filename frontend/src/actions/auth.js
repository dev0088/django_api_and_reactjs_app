import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'
// import { withAuth } from '../reducers';

export const login = (email, password) => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/auth/login/`,
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.LOGIN.REQUEST, types.LOGIN.SUCCESS, types.LOGIN.FAILURE
        ],
      }
})

export const logout = (token) => ({
    [RSAA]: {
        endpoint: `${apiConfig.url}/auth/logout/`,
        method: 'POST',
		body: JSON.stringify({token: token}),
        headers: { 'Content-Type': 'application/json' },
        types: [
            types.LOGOUT.REQUEST, types.LOGOUT.SUCCESS, types.LOGOUT.FAILURE
        ]
      }
})

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: `{$apiConfig.url}/auth/token/refresh/`,
        method: 'POST',
        body: JSON.stringify({token: token}),
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.TOKEN.REQUEST, types.TOKEN.RECEIVED, types.TOKEN.FAILURE
        ]
    }
})
