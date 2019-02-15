export function setAuth(auth) {
  localStorage.setItem('auth', JSON.stringify(auth));
}

export function getAuth() {
  return JSON.parse(localStorage.getItem('auth'));
}

export function getToken() {
  let auth = getAuth();
  return (auth && auth.access.token) ? auth.access.token : null;
}

export function getUserID() {
  let auth = getAuth();
  return (auth && auth.access) ? auth.access.user_id : null;
}