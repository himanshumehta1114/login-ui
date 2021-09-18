import {
  useContext,
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import * as auth from "../helpers/auth-helper";

const AuthContext = createContext(null);
AuthContext.displayName = "AuthContext";

/**
 * Provider for Auth context, to share the auth state in the app.
 * 
 * @param {*} props 
 * @returns 
 */
const AuthProvider = (props) => {
  const [otpReferenceId, setOtpReferenceId] = useState(null);
  const [statusCode, setStatusCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = auth.getToken();

    if (token) {
      setStatusCode("success");
    }
  }, [setStatusCode]);

  /**
   * generates the OTP and updates loading state
   */
  const generateOtp = useCallback(
    (mobile) => {
      setIsLoading(true);
      auth.generateOtp({ mobile }).then(({ data: { otpReferenceId } }) => {
        setOtpReferenceId(otpReferenceId);
        setIsLoading(false);
      });
    },
    [setOtpReferenceId, setIsLoading]
  );

  /**
   * validates the OTP with the API and updates the loading state
   */
  const validateOtp = useCallback(
    ({ otp, otpReferenceId }) => {
      setIsLoading(true);
      auth.validateOtp({ otp, otpReferenceId }).then(({ statusCode }) => {
        setStatusCode(statusCode);
        auth.setToken(statusCode);
        setIsLoading(false);
      });
    },
    [setStatusCode]
  );

  /**
   * logouts and resets all persist values to the initial state 
   */
  const logout = useCallback(() => {
    auth.logout();
    setStatusCode("");
    setOtpReferenceId("");
  }, [setStatusCode]);

  /**
   * resets the details persisted on otp generation. For eg `otpReferenceId`
   */
  const resetGenOtp = useCallback(() => {
    setOtpReferenceId("");
  }, [setOtpReferenceId]);

  const value = useMemo(
    () => ({
      otpReferenceId,
      statusCode,
      generateOtp,
      validateOtp,
      isLoading,
      logout,
      resetGenOtp,
    }),
    [
      otpReferenceId,
      statusCode,
      generateOtp,
      validateOtp,
      isLoading,
      logout,
      resetGenOtp,
    ]
  );

  return <AuthContext.Provider value={value} {...props} />;
};

/**
 * Auth hook to provide all the peristed auth detailss
 * 
 * @returns 
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { useAuth, AuthProvider };
