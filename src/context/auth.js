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

  const logout = useCallback(() => {
    auth.logout()
    setStatusCode('')
    setOtpReferenceId("")
  }, [setStatusCode]);

  const value = useMemo(
    () => ({
      otpReferenceId,
      statusCode,
      generateOtp,
      validateOtp,
      isLoading,
      logout,
    }),
    [otpReferenceId, statusCode, generateOtp, validateOtp, isLoading, logout]
  );

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { useAuth, AuthProvider };
