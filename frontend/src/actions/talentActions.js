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
