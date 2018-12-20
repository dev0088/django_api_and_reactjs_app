import apiConfig from 'constants/api';
import { getToken, getUserID } from "service/storage";

class ClientAPI {
  static processResponse(response, handleResponse) {
    console.log('=== response: ', response)
    if(response.error) {
      console.log('error: ', response.error)
      handleResponse(response.error, true)
    }
    else {
      if (response){
        console.log('success: ', response)
        handleResponse(response, false)
      } else {
        console.log('error: ', response)
        handleResponse(response.error, true)
      }
    }
  }

  static processRequest(url, method, data, handleResponse) {
    console.log('==== processRequest: ', url, data)
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
        console.log('error: ', error)
        handleResponse(error, true)
      })
  }

  static processRequestWithToken(url, method, data, handleResponse) {
    console.log('==== processRequest: ', url, data)
    let parameters = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };

    if (method !== 'get' && data !== '' && data !== null) {
      parameters = {...parameters, body: JSON.stringify(data)};
    }

    console.log('==== parameters: ', parameters)

    fetch(`${apiConfig.url}/${url}`, parameters)
      .then(response => response.json())
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

  static saveCastingRequestTalent(crtID, data, handleResponse) {
    this.processRequestWithToken(`client/casting_request_talent/${crtID}/`, 'put', data, handleResponse)
  }

}
export default ClientAPI
