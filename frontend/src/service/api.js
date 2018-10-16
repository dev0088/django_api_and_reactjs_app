import { RSAA } from 'redux-api-middleware';
import * as types from '../actions/actionTypes'

export const processRequest = (url = '', method = 'GET', headers, actionType, data = null) => {
  return {
    [RSAA]: {
      endpoint: url,
      method: method,
      headers: headers,
      types: [
        {type: 'REQUEST', meta: { source: actionType['REQUEST'] }},
        {type: 'SUCCESS', meta: { source: actionType['SUCCESS'] }},
        {type: 'FAILURE', meta: { source: actionType['FAILURE'] }},
      ]
    }
  }
};
