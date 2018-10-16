export function getToken() {
  let auth = JSON.parse(localStorage.getItem('auth'));
  console.log('===== auth: ', auth);
  return auth.token;
}

export function getUserID() {
  let auth = JSON.parse(localStorage.getItem('auth'));
  return auth.access.user_id;
}