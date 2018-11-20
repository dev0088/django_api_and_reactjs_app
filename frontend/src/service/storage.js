export function getToken() {
  let auth = JSON.parse(localStorage.getItem('auth'));
  return auth ? auth.token : null;
}

export function getUserID() {
  let auth = JSON.parse(localStorage.getItem('auth'));
  return auth && auth.access ? auth.access.user_id : null;
}