import http from "./httpService";
import jwtDecode from "jwt-decode";

export const myToken = "token";

export async function login(email, userpassword) {
  const response = await http.post(`/auth`, {
    email,
    userpassword,
  });

  localStorage.setItem(myToken, response.headers["x-auth-token"]);
}

export function loginWithjwt(jwt) {
  localStorage.setItem(myToken, jwt);
}

export function logout() {
  localStorage.removeItem(myToken);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(myToken);
    
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}

const auth = {
  login,
  loginWithjwt,
  logout,
  getCurrentUser,
};
export default auth;
