import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import defaultValues from 'constants/defaultValues'
import * as types from './actionTypes'

export const getVideoQuestionsActions = (positionName, mode) => ({
  [RSAA]: {
    endpoint: ((mode === defaultValues.DEFAULT_PRACTICE_POSITION_TYPE) ? `${apiConfig.url}/question/practice/static` : `${apiConfig.url}/question/random/?position_type=${positionName}`),
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