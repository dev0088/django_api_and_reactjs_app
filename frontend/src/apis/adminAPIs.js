import apiConfig from 'constants/api';
import { getToken, getUserID } from "service/storage";

class AdminAPI {
  static processResponse(response, handleResponse) {
    console.log('=== response: ', response);
    if(response.error) {
      console.log('error: ', response.error);
      handleResponse(response.error, true);
    }
    else {
      if (response){
        console.log('success: ', response);
        handleResponse(response, false);
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
    };

    if (data) {
      params = {
        ...params,
        body: JSON.stringify(data)
      };
    }

    fetch(`${apiConfig.url}/${url}`, params)
      .then(response => response.json())
      .then(response => {
        this.processResponse(response, handleResponse);
      })
      .catch(error => {
        console.log('error: ', error);
        handleResponse(error, true);
      })
  }

  static processRequestWithToken(url, method, data, handleResponse) {
    console.log('==== processRequest: ', url, data);
    let parameters = {
      method: method,
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      }
    };

    if (method !== 'get' && data !== '' && data !== null) {
      parameters = {...parameters, body: JSON.stringify(data)};
    }

    fetch(`${apiConfig.url}/${url}/`, parameters)
      .then(response => {console.log('=== response: ', response); return response.json()})
      .then(response => {
        this.processResponse(response, handleResponse);
      })
      .catch(error => {
        console.log('error: ', error);
        handleResponse(error, true);
      })
  }

  static getProfile(profileId, handleResponse) {
    this.processRequestWithToken(`talent/${profileId}`, 'get', null, handleResponse);
  }

  static saveProfile(userId, data, handleResponse) {
    this.processRequestWithToken(`talent/${userId}`, 'put', data, handleResponse);
  }

  static saveProfileResume(resumeId, data, handleResponse) {
    this.processRequestWithToken(`talent_resume/${resumeId}`, 'put', data, handleResponse);
  }

  static deleteProfileResume(resumeId, data, handleResponse) {
    this.processRequestWithToken(`talent_resume/${resumeId}`, 'delete', data, handleResponse);
  }

  static saveProfilePicture(pictureId, data, handleResponse) {
    this.processRequestWithToken(`talent_picture/${pictureId}`, 'put', data, handleResponse);
  }

  static deleteProfilePicture(pictureId, data, handleResponse) {
    this.processRequestWithToken(`talent_picture/${pictureId}`, 'delete', data, handleResponse);
  }

  static getAllCastingRequests(handleResponse) {
    this.processRequestWithToken(`agency/casting_request/all`, 'get', null, handleResponse);
  }
  
  static searchCastingRequestTalent(data, handleResponse) {
    this.processRequestWithToken(`agency/casting_request_talent/search`, 'post', data, handleResponse);
  }

  static searchCastingRequest(data, handleResponse) {
    this.processRequestWithToken(`agency/casting_request/search`, 'post', data, handleResponse);
  }

  static getCastingRequest(castingRequestId, handleResponse) {
    this.processRequestWithToken(`agency/casting_request/${castingRequestId}`, 'get', null, handleResponse);
  }

  static setCastingRequestStatus(castingRequestId, data, handleResponse) {
    this.processRequestWithToken(`agency/casting_request/set_status/${castingRequestId}`, 'put', data, handleResponse);
  }

  static saveGreetingVideo(videoId, data, handleResponse) {
    this.processRequestWithToken(`talent_video_greetings/${videoId}`, 'put', data, handleResponse);
  }

  static deleteGreetingVideo(videoId, data, handleResponse) {
    this.processRequestWithToken(`talent_video_greetings/${videoId}`, 'delete', data, handleResponse);
  }

  static saveSubSkillVideo(videoId, data, handleResponse) {
    this.processRequestWithToken(`talent_video_sub_skills/${videoId}`, 'put', data, handleResponse);
  }

  static deleteSubSkillVideo(videoId, data, handleResponse) {
    this.processRequestWithToken(`talent_video_sub_skills/${videoId}`, 'delete', data, handleResponse);
  }

  static addNote(data, handleResponse) {
    this.processRequestWithToken(`agency/user_note/create`, 'post', data, handleResponse);
  }

  static searchNotes(data, handleResponse) {
    this.processRequestWithToken(`agency/user_note/search`, 'post', data, handleResponse);
  }

  static getAgencyOverview(handleResponse) {
    this.processRequestWithToken(`agency/overview/overview`, 'get', null, handleResponse);
  }
}
export default AdminAPI
