import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

export const myToken = "token";

http.setJwt(localStorage.getItem(myToken));

export async function login(email, userpassword) {
  const response = await http.post(`${config.apiUrl}/auth`, {
    email,
    userpassword,
  });

  localStorage.setItem(myToken, response.data.token);
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

export default {
  login,
  loginWithjwt,
  logout,
  getCurrentUser,
};
