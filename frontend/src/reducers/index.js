import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth'
import register from './register'
import echo, * as fromEcho from './echo'
import shiptalentInfo from './shiptalentInfo'
import videoQuestions, { videoSettings } from './video'
import { getCurrentTalentInfo } from './talent.js'
import { getAllPositionTypes } from './positionTypes'
import { getAllSkills } from './skills'
import { getWizardQuestionScenario } from './wizardQuestionScenario'
import deviceSettings from './deviceSettings'
import contactUs from './contactus'
import {getCurrentClientInfo, talentSearchReducer, requestViewReducer, searchViewReducer} from './clientReducer'

export default combineReducers({
  auth: auth,
  echo: echo,
  register: register,
  shiptalentInfo: shiptalentInfo,
  videoQuestions: videoQuestions,
  videoSettings: videoSettings,
  router: routerReducer,
  // talentReducer: talentReducer,
  deviceSettings: deviceSettings,
  talentInfo: getCurrentTalentInfo,
  contactUs: contactUs,
  allPositionTypes: getAllPositionTypes,
  allSkills: getAllSkills,
  wizardQuestionScenario: getWizardQuestionScenario,
  talentSearchResult: talentSearchReducer,
  requestViewReducer,
  searchViewReducer,
  clientInfo: getCurrentClientInfo
})


export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth)
export const accessToken = state => fromAuth.accessToken(state.auth)
export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth)
export const refreshToken = state => fromAuth.refreshToken(state.auth)
export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth)
export const authErrors = state => fromAuth.errors(state.auth)
export const serverMessage = state => fromEcho.serverMessage(state.echo)

export function withAuth(headers={}) {
  return (state) => ({
    ...headers,
    'Authorization': `Bearer ${accessToken(state)}`
  })
}
