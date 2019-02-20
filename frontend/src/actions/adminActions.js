import { RSAA } from 'redux-api-middleware';
import apiConfig from 'constants/api';
import * as types from './actionTypes'
import { getToken } from "service/storage";

export const searchNotes = (data) => {
  let token = getToken();
  return {
    [RSAA]: {
      endpoint: `${apiConfig.url}/agency/user_note/search`,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      types: [
        types.SEARCH_NOTES.REQUEST, types.SEARCH_NOTES.SUCCESS, types.SEARCH_NOTES.FAILURE
      ]
    }
  }
};
