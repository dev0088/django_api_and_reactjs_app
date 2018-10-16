import apiConfig from '../constants/api';
import { getToken, getUserID } from "../service/storage";

class TalentAPI {
  static saveTalentInfo(user_id, data, handleResponse) {
    console.log('==== saveTalentInfo: ', user_id, data)
    fetch(`${apiConfig.url}/talent/${user_id}/`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then(response => {
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
    })
    .catch(error => {
      console.log('error: ', error)
      handleResponse(error, true)
    })
  }

  static saveLanguages(user_id, data, handleResponse) {
    console.log('==== saveLanguages: ', user_id, data)
    fetch(`${apiConfig.url}/talent_language/${user_id}/all`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
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
    })
    .catch(error => {
      console.log('error: ', error)
      handleResponse(error, true)
    })
  }

	static saveMedicals(user_id, data, handleResponse) {
    console.log('==== saveMedicals: ', user_id, data)
    fetch(`${apiConfig.url}/talent_medical/${user_id}/all`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
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
    })
    .catch(error => {
      console.log('error: ', error)
      handleResponse(error, true)
    })
  }

  static deletePicture(picture_id, handleResponse) {
    console.log('==== deletePicture: ', picture_id)
    fetch(`${apiConfig.url}/talent_picture/${picture_id}/`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
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
    })
    .catch(error => {
      console.log('error: ', error)
      handleResponse(error, true)
    })
  }

  static deleteResume(resume_id, handleResponse) {
    console.log('==== deleteResume: ', resume_id)
    fetch(`${apiConfig.url}/talent_resume/${resume_id}/`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
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
    })
    .catch(error => {
      console.log('error: ', error)
      handleResponse(error, true)
    })
  }

}
export default TalentAPI
