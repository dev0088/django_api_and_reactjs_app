import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'
import { getToken, getUserID } from "../service/storage";
import { processRequest } from "../service/api";


export const getCurrentClientInfo = () => {
  let token = getToken();

  if (token) {
    return {
      [RSAA]: {
        endpoint: `${apiConfig.url}/client/currentClientInfo/`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        types: [
          types.CLIENT_INFO.REQUEST,
          types.CLIENT_INFO.SUCCESS,
          types.CLIENT_INFO.FAILURE
        ]
      }}
  } else {
    return {
      [RSAA]: {
        endpoint: `${apiConfig.url}/client/currentClientInfo/`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        types: [
          types.CLIENT_INFO.REQUEST,
          types.CLIENT_INFO.SUCCESS,
          types.CLIENT_INFO.FAILURE
        ]
      }}
  }
};

export const getClientInfo = (id) => {
  if (id) {
    console.trace('client id is null: ');
    return {
      [RSAA]: {
        endpoint: `${apiConfig.url}/client/${id}/`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        types: [
          types.CLIENT_INFO.REQUEST,
          types.CLIENT_INFO.SUCCESS,
          types.CLIENT_INFO.FAILURE
        ]
      }}
  } else {
    console.trace('client id is null: ');
  }
};

export const talentSearch = (data) => {
  let token = getToken();
  return {
    [RSAA]: {
      endpoint: `${apiConfig.url}/client/talent_search/`,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      types: [
        types.TALENT_SEARCH.REQUEST, types.TALENT_SEARCH.SUCCESS, types.TALENT_SEARCH.FAILURE
      ]
    }
  }
};

export const requestView = () => {
  let token = getToken();
  return ({
    [RSAA]: {
      endpoint: `${apiConfig.url}/client/request_view/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      types: [
        types.REQUEST_VIEW.REQUEST, types.REQUEST_VIEW.SUCCESS, types.REQUEST_VIEW.FAILURE
      ]
    }
  })
};

export const onCastingViewSearch = (data) => {
  let token = getToken();
  return ({
    [RSAA]: {
      endpoint: `${apiConfig.url}/client/request_view/`,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      types: [
        types.SEARCH_VIEW.REQUEST, types.SEARCH_VIEW.SUCCESS, types.SEARCH_VIEW.FAILURE
      ]
    }
  });
};

export const onCallbackTalent = () => ({
  [RSAA]: {
    endpoint: `${apiConfig.url}/client/callback/`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    types: [
      types.CALLBACK_TALENT.REQUEST, types.CALLBACK_TALENT.SUCCESS, types.CALLBACK_TALENT.FAILURE
    ]
  }
});

export const onFavoriteTalent = () => {
  let token = getToken();
  return ({
    [RSAA]: {
      endpoint: `${apiConfig.url}/client/favorite/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      types: [
        types.FAVORITE_TALENT.REQUEST, types.FAVORITE_TALENT.SUCCESS, types.FAVORITE_TALENT.FAILURE
      ]
    }
  });
};

export const setSearchCondition = (condition) => {
  return {
    type: types.SET_SEARCH_CONDITION,
    payload: {
      ...condition
    }
  }
};