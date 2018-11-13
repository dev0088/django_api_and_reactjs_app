import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth, * as fromAuth from './auth.js'
import register from './register.js'
import echo, * as fromEcho from './echo.js'
import shiptalentInfo from './shiptalentInfo.js'
import videoQuestions, { videoSettings } from './video.js'
import { getCurrentTalentInfo } from './talent.js'
import { getAllPositionTypes } from './positionTypes.js'
import { getAllSkills } from './skills.js'
import deviceSettings from './deviceSettings.js'
import contactUs from './contactus.js'
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
