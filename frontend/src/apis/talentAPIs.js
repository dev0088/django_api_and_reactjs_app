import apiConfig from '../constants/api';
import { getToken, getUserID } from "../service/storage";

class TalentAPI {
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
    fetch(`${apiConfig.url}/${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        this.processResponse(response, handleResponse)
      })
      .catch(error => {
        console.log('error: ', error)
        handleResponse(error, true)
      })
  }

  static saveTalentInfo(user_id, data, handleResponse) {
    this.processRequest(`talent/${user_id}/`, 'put', data, handleResponse)
  }

  static saveTalentInfoWithToken(data, handleResponse) {
    this.processRequestWithToken(`talent/${getUserID()}/`, 'put', data, handleResponse)
  }

  static saveLanguages(user_id, data, handleResponse) {
    this.processRequest(`talent_language/${user_id}/all`, 'post', data, handleResponse)
  }

	static saveMedicals(user_id, data, handleResponse) {
    this.processRequest(`talent_medical/${user_id}/all`, 'post', data, handleResponse)
  }

  static saveAvailability(user_id, data, handleResponse) {
    this.processRequest(`talent_availability/${user_id}/all`, 'post', data, handleResponse)
  }

  static saveAvailabilityWithToken(data, handleResponse) {
    this.processRequest(`talent_availability/${getUserID()}/all`, 'post', data, handleResponse)
  }

  static deletePicture(picture_id, handleResponse) {
    this.processRequest(`talent_picture/${picture_id}/`, 'delete', null, handleResponse)
  }

  static deleteResume(resume_id, handleResponse) {
    this.processRequest(`talent_picture/${resume_id}/`, 'delete', null, handleResponse)
  }

}
export default TalentAPI
