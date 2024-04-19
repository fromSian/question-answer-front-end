// 获取Token
export function getToken() {
  return localStorage.getItem("token");
}

// 设置Token，1天,与后端同步
export function setToken(token) {
  localStorage.setItem("token", token);
}

// 删除Token
export function removeToken() {
  localStorage.removeItem("token");
}
