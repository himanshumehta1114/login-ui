/**
 * helper functions to facilitate authentication
 */

import apiClient from "../api";

/**
 * key to store navi auth token, 
 * currently is stores the statusCode because 
 * since the APIs do not return token on otp validation 
 */
const localStorageKey = "navi_auth_token";

/**
 * persist token for auth validation
 * 
 * @param {object} data - data returned on authentication
 * @param {string} data.statusCode - status code of returned response
 * @returns {string} status code - `success` if authenticated
 */
const setToken = ({ statusCode }) => {
  window.localStorage.setItem(localStorageKey, statusCode);
  return statusCode;
};

/**
 * returns the status code of authenticated request
 * 
 * @returns {string} persisted success code of auth request
 */
const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

/**
 * validates the otp and referenceId with the API
 * 
 * @param {object} otpReq - otp request payload
 * @param {string} otpReq.otp - otp code
 * @param {string} otpReq.otpReferenceId - otp reference id generated on each otp request 
 * @returns {object} api response on OTP validation
 */
const validateOtp = async ({ otp, otpReferenceId }) => {
  return await apiClient("validate-otp", { otp, otpReferenceId });
};

/**
 * generates and sends OTP on the supplied mobile number
 * 
 * @param {object} otpReq - payload to generate otp
 * @param {number} otpReq.mobile - mobile number to send otp
 * @returns {object} api response on OTP generation
 */
const generateOtp = async ({ mobile }) => {
  return await apiClient("generate-otp", { mobile });
};

/**
 * removes the persisted auth details
 */
const logout = () => {
  window.localStorage.removeItem(localStorageKey);
};

export { getToken, setToken, validateOtp, generateOtp, logout };
