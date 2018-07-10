import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'

export const login = (username, password) => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/api/v1/auth/login/`,
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.LOGIN.REQUEST, types.LOGIN.SUCCESS, types.LOGIN.FAILURE
        ]
      }
})

export const logout = (username) => ({
    [RSAA]: {
        endpoint: `${apiConfig.url}/api/auth/logout/`,
        method: 'POST',
        body: JSON.stringify({username}),
        headers: { 'Content-Type': 'application/json' },
        types: [
            types.LOGOUT.REQUEST, types.LOGOUT.SUCCESS, types.LOGOUT.FAILURE
        ]
      }
})

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: `{$apiConfig.url}/api/auth/token/refresh/`,
        method: 'POST',
        body: JSON.stringify({refresh: token}),
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.TOKEN.REQUEST, types.TOKEN.RECEIVED, types.TOKEN.FAILURE
        ]
    }
})
