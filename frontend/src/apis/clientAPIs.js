import apiConfig from 'constants/api';
import { getToken, getUserID } from "service/storage";

class ClientAPI {
  static processResponse(response, handleResponse) {
    console.log('=== response: ', response);
    if(response.error) {
      console.log('error: ', response.error);
      handleResponse(response.error, true);
    }
    else {
      if (response){
        console.log('success: ', response);
        handleResponse(response, false)
      } else {
        console.log('error: ', response);
        handleResponse(response.error, true);
      }
    }
  }

  static processRequest(url, method, data, handleResponse) {
    console.log('==== processRequest: ', url, data);
    let params = {
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    }
    if (data) {
      params = {
        ...params,
        body: JSON.stringify(data)
      }
    }

    fetch(`${apiConfig.url}/${url}`, params)
      .then(response => response.json())
      .then(response => {
        this.processResponse(response, handleResponse)
      })
      .catch(error => {
        console.log('error: ', error);
        handleResponse(error, true)
      })
  }

  static processRequestWithToken(url, method, data, handleResponse) {
    console.log('==== processRequest: ', url, data);
    let parameters = {
      method: method,
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Access-Control-Expose-Headers": "Access-Control-*",
        "Access-Control-Allow-Headers": "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        'Access-Control-Allow-Origin': '*',
        'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        "Authorization": `Bearer ${getToken()}`
      }
    };

    if (method !== 'get' && data !== '' && data !== null) {
      parameters = {...parameters, body: JSON.stringify(data)};
    }

    console.log('==== parameters: ', parameters)

    fetch(`${apiConfig.url}/${url}`, parameters)
      .then(response => {console.log('=== response: ', response); return response.json()})
      .then(response => {
        this.processResponse(response, handleResponse)
      })
      .catch(error => {
        console.log('error: ', error)
        handleResponse(error, true)
      })
  }

  static createCastingRequest(data, handleResponse) {
    this.processRequestWithToken(`client/casting_request/create`, 'post', data, handleResponse)
  }

  static saveCastingRequest(crID, data, handleResponse) {
    this.processRequestWithToken(`client/casting_request/${crID}/`, 'put', data, handleResponse)
  }

  static getCastingRequestDetail(crID, handleResponse) {
    this.processRequestWithToken(`client/casting_request/${crID}/`, 'get', null, handleResponse)
  }

  static getCastingRequestTalent(crtID, handleResponse) {
    this.processRequestWithToken(`client/casting_request_talent/${crtID}/`, 'get', null, handleResponse)
  }

  static getAllCompletedCastingRequestTalent(handleResponse) {
    this.processRequestWithToken(`client/casting_request_talent/completed_all`, 'get', null, handleResponse)
  }

  static saveCastingRequestTalent(crtID, data, handleResponse) {
    this.processRequestWithToken(`client/casting_request_talent/${crtID}/`, 'put', data, handleResponse)
  }

  static createAllCastingRequestTalents(data, handleResponse) {
    this.processRequestWithToken(`client/casting_request_talent/create/`, 'post', data, handleResponse)
  }

  static deleteCastingRequestTalent(crtID, handleResponse) {
    this.processRequestWithToken(`client/casting_request_talent/${crtID}/`, 'delete', null, handleResponse)
  }

  static getAllBlockedProfiles(handleResponse) {
    this.processRequestWithToken(`client/blocked_profile/all`, 'get', null, handleResponse)
  }

  static blockTalent(data, handleResponse) {
    this.processRequestWithToken(`client/blocked_profile/create`, 'post', data, handleResponse)
  }


  static unblockProfile(bpID, handleResponse) {
    this.processRequestWithToken(`client/blocked_profile/${bpID}/`, 'delete', null, handleResponse)
  }

  static saveBlockedProfile(bpID, data, handleResponse) {
    this.processRequestWithToken(`client/blocked_profile/${bpID}/`, 'put', data, handleResponse)
  }

  static getAllCallBacks(handleResponse) {
    this.processRequestWithToken(`client/call_back/all`, 'get', null, handleResponse)
  }

  static addCallBacks(data, handleResponse) {
    this.processRequestWithToken(`client/call_back/create`, 'post', data, handleResponse)
  }

  static removeCallBack(callbackId, handleResponse) {
    this.processRequestWithToken(`client/call_back/${callbackId}/`, 'delete', null, handleResponse)
  }

  static getAllFavorites(handleResponse) {
    this.processRequestWithToken(`client/favorite/all`, 'get', null, handleResponse)
  }

  static addFavorite(data, handleResponse) {
    this.processRequestWithToken(`client/favorite/create`, 'post', data, handleResponse)
  }

  static removeFavorite(favoriteId, handleResponse) {
    this.processRequestWithToken(`client/favorite/${favoriteId}/`, 'delete', null, handleResponse)
  }

  static addRating(data, handleResponse) {
    this.processRequestWithToken(`talent_rating/create`, 'post', data, handleResponse)
  }

}
export default ClientAPI
