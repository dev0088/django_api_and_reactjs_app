import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'

export const getShipTalentInfo = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/shiptalent_info/all`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.SHIPTALENT_INFO.REQUEST, types.SHIPTALENT_INFO.SUCCESS, types.SHIPTALENT_INFO.FAILURE
        ]
      }
})
