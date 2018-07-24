import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'

var position_type = "Vocalist";
var position_sub_type = "Tenor";
export const getVideoQuestionsActions = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/question/random?position_type=${position_type}&position_sub_type=${position_sub_type}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.VIDEO_QUESTION.REQUEST, types.VIDEO_QUESTION.SUCCESS, types.VIDEO_QUESTION.FAILURE
        ]
      }
})

export const getVideoSettingsActions = () => ({
	  [RSAA]: {
        endpoint: `${apiConfig.url}/video_interview_settings/time`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        types: [
          types.VIDEO_SETTINGS.REQUEST, types.VIDEO_SETTINGS.SUCCESS, types.VIDEO_SETTINGS.FAILURE
        ]
      }
})