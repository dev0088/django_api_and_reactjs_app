import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'

export const registerRequest = (
	userName,
  email,
  password,
  passwordConfirm,
  firstName,
  lastName,
  type
) => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/auth/register/`,
        method: 'POST',
        body: JSON.stringify({
					username: userName,
				  email,
				  password,
				  passwordConfirm,
				  first_name: firstName,
				  last_name: lastName,
				  type
				}),
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.REGISTER.REQUEST, types.REGISTER.SUCCESS, types.REGISTER.FAILURE
        ]
      }
})
