import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'

export const getSignedUrl = (url, params) => ({
  [RSAA]: {
      endpoint: `${apiConfig.url}/talent_picture/picture_policy/`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      types: [
        types.TALENT_UPLOAD_PICTURE.REQUEST, types.TALENT_UPLOAD_PICTURE.SUCCESS, types.TALENT_UPLOAD_PICTURE.FAILURE
      ]
    }
})

export const getTalentInfo = (id) => ({
	[RSAA]: {
      endpoint: `${apiConfig.url}/talent/${id}/`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        types.TALENT_INFO.REQUEST, 
        types.TALENT_INFO.SUCCESS, 
        types.TALENT_INFO.FAILURE
      ]
    }
})

export const getTalentPositionTypes = (id) => ({
  [RSAA]: {
      endpoint: `${apiConfig.url}/talent_position_type/${id}/`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        types.TALENT_POSITION_TYPES.REQUEST, 
        types.TALENT_POSITION_TYPES.SUCCESS, 
        types.TALENT_POSITION_TYPES.FAILURE
      ]
    }
})

export const getAllPositionTypes = () => ({
  [RSAA]: {
      endpoint: `${apiConfig.url}/talent_position_type/all`,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        types.ALL_POSITION_TYPES.REQUEST, 
        types.ALL_POSITION_TYPES.SUCCESS, 
        types.ALL_POSITION_TYPES.FAILURE
      ]
    }
})
