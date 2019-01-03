const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const RECEIVED = 'RECEIVED';
const INIT     = 'INIT';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, RECEIVED, INIT].forEach(type => res[type] = `${base}_${type}`);
  return res;
}

// export const LOGIN_REQUEST = '@@jwt/LOGIN_REQUEST';
// export const LOGIN_SUCCESS = '@@jwt/LOGIN_SUCCESS';
// export const LOGIN_FAILURE = '@@jwt/LOGIN_FAILURE';
//
// export const TOKEN_REQUEST = '@@jwt/TOKEN_REQUEST';
// export const TOKEN_RECEIVED = '@@jwt/TOKEN_RECEIVED';
// export const TOKEN_FAILURE = '@@jwt/TOKEN_FAILURE';

// Login events
export const LOGIN = createRequestTypes('@@jwt/LOGIN');
export const TOKEN = createRequestTypes('@@jwt/TOKEN');
export const REGISTER = createRequestTypes('@@jwt/REGISTER');

export const LOGOUT = createRequestTypes('@@jwt/LOGOUT'); // logout is always success

export const SHIPTALENT_INFO = createRequestTypes('@@jwt/SHIPTALENT_INFO');

export const VIDEO_QUESTION = createRequestTypes('@@jwt/VIDEO_QUESTION');
export const VIDEO_SETTINGS = createRequestTypes('@@jwt/VIDEO_SETTINGS');

export const TALENT_UPLOAD_PICTURE = createRequestTypes('@@jwt/TALENT_UPLOAD_PICTURE');
export const TALENT_INFO = createRequestTypes('@@jwt/TALENT_INFO');
export const SAVE_TALENT_INFO = createRequestTypes('@@jwt/SAVE_TALENT_INFO');
export const TALENT_POSITION_TYPES = createRequestTypes('@@jwt/TALENT_POSITION_TYPES');
export const TALENT_CHANGE_PASSWORD = createRequestTypes('@@jwt/TALENT_CHANGE_PASSWORD');

export const ALL_POSITION_TYPES = createRequestTypes('ALL_POSITION_TYPES');
export const ALL_SKILLS = createRequestTypes('ALL_SKILLS');
export const WIZARD_QUESTION_SCENARIO = createRequestTypes('WIZARD_QUESTION_SCENARIO');
export const CONTACT_US = createRequestTypes('CONTACT_US');
export const DEVICE_SETTINGS_SAVE = 'DEVICE_SETTINGS_SAVE';

// Client event
export const CLIENT_INFO = createRequestTypes('@@jwt/CLIENT_INFO');
export const TALENT_SEARCH = createRequestTypes('@@jwt/TALENT_SEARCH');
export const REQUEST_VIEW = createRequestTypes('@@jwt/REQUEST_VIEW');
export const SEARCH_VIEW = createRequestTypes('@@jwt/SEARCH_VIEW');
export const CALLBACK_TALENT = createRequestTypes('@@jwt/CALLBACK_TALENT');
export const FAVORITE_TALENT = createRequestTypes('@@jwt/FAVORITE_TALENT');

// Common
export const GLOBAL_NOTIFICATION = 'GLOBAL_NOTIFICATION';