import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'
import { getToken, getUserID } from "../service/storage";
import { processRequest } from "../service/api";

// export const setSelectedProfile = (profile) => {
//   return {
//     type: types.SET_SELECTED_PROFILE,
//     payload: {
//       selectedProfile: profile
//     }
//   }
// };

