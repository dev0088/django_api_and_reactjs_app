import apiConfig from '../constants/api';

class TalentAPI {
  static saveTalentInfo(user_id, data, handleResponse) {
    // [RSAA]: {
    //     endpoint: `${apiConfig.url}/talent/${user_id}/`,
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //     types: [
    //       types.SAVE_TALENT_INFO.REQUEST, 
    //       types.SAVE_TALENT_INFO.SUCCESS, 
    //       types.SAVE_TALENT_INFO.FAILURE
    //     ]
    //   }
    console.log('==== saveTalentInfo: ', user_id, data)
    fetch(`${apiConfig.url}/talent/${user_id}/`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(response => {
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