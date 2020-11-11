import http from "./httpService";
import config from "../config.json";

export function getCountries() {
  return http.get(`${config.apiUrl}/countries`);
}

export function getCountrie(countryId) {
  return http.get(`${config.apiUrl}/countries/${countryId}`);
}
