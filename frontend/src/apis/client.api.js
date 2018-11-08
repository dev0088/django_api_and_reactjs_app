import {RSAA} from "redux-api-middleware"
import apiConfig from '../constants/api';
import * as types from '../constants/client.constant'

export const talentSearch = (data) => ({
  [RSAA]: {
    endpoint: `${apiConfig.url}/client/talent_search/`,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
    types: [
      types.TALENT_SEARCH.REQUEST, types.TALENT_SEARCH.SUCCESS, types.TALENT_SEARCH.FAILURE
    ]
  }
});

export const requestView = () => ({
  [RSAA]: {
    endpoint: `${apiConfig.url}/client/request_view/`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    types: [
      types.REQUEST_VIEW.REQUEST, types.REQUEST_VIEW.SUCCESS, types.REQUEST_VIEW.FAILURE
    ]
  }
});

export const onCastingViewSearch = (data) => ({
  [RSAA]: {
    endpoint: `${apiConfig.url}/client/request_view/`,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
    types: [
      types.SEARCH_VIEW.REQUEST, types.SEARCH_VIEW.SUCCESS, types.SEARCH_VIEW.FAILURE
    ]
  }
});

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

export const onFavoriteTalent = () => ({
  [RSAA]: {
    endpoint: `${apiConfig.url}/client/favorite/`,
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    types: [
      types.FAVORITE_TALENT.REQUEST, types.FAVORITE_TALENT.SUCCESS, types.FAVORITE_TALENT.FAILURE
    ]
  }
});