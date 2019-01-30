import { RSAA } from 'redux-api-middleware';
import apiConfig from '../constants/api';
import * as types from './actionTypes'
import { getToken, getUserID } from "../service/storage";
import { processRequest } from "../service/api";

//
// export const getCurrentAdminInfo = () => {
//   let token = getToken();
//
//   if (token) {
//     return {
//       [RSAA]: {
//         endpoint: `${apiConfig.url}/admin/currentAdminInfo/`,
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         types: [
//           types.CLIENT_INFO.REQUEST,
//           types.CLIENT_INFO.SUCCESS,
//           types.CLIENT_INFO.FAILURE
//         ]
//       }}
//   } else {
//     return {
//       [RSAA]: {
//         endpoint: `${apiConfig.url}/client/currentClientInfo/`,
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         types: [
//           types.CLIENT_INFO.REQUEST,
//           types.CLIENT_INFO.SUCCESS,
//           types.CLIENT_INFO.FAILURE
//         ]
//       }}
//   }
// };
