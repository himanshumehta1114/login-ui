import apiClient from "../api";

const localStorageKey = "navi_auth_token";

const setToken = ({ statusCode }) => {
  window.localStorage.setItem(localStorageKey, statusCode);
  return statusCode;
};

const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

const validateOtp = async ({ otp, otpReferenceId }) => {
  return await apiClient("validate-otp", { otp, otpReferenceId });
};

const generateOtp = async ({ mobile }) => {
  return await apiClient("generate-otp", { mobile });
};

const logout = () => {
  window.localStorage.removeItem(localStorageKey);
};

export { getToken, setToken, validateOtp, generateOtp, logout };
