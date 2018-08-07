import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'

export const contactUs = (data) => ({
  [RSAA]: {
      endpoint: `${apiConfig.url}/submission/create`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      types: [
        types.CONTACT_US.REQUEST, types.CONTACT_US.SUCCESS, types.CONTACT_US.FAILURE
      ]
    }
})
