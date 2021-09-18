import { useState } from "react";
import "./login.css";
import Input from "../../components/input";
import Button from "../../components/button";
import Otp from "../../components/otp";
import Error from "../../components/error"
import { formatMobileInput, formatMobileOutput } from "../../helpers/helpers";
import { useAuth } from "../../context/auth";

const Login = () => {
  const otpLength = 4;
  const { generateOtp, validateOtp, otpReferenceId, isLoading } = useAuth();

  const initOtpVal = () => Array(otpLength).fill("");

  const [otp, setOtp] = useState(initOtpVal);
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitMobile = (e) => {
    e.preventDefault();

    generateOtp(formatMobileOutput(number));

    setIsSubmitted(true);
  };

  const submitOtp = (e) => {
    e.preventDefault();

    const missedVals = otp.filter((_) => !_.length).length;

    setError(missedVals ? "Please enter complete OTP" : "")

    if (missedVals) {
      return;
    }

    validateOtp({ otp: otp.join(""), otpReferenceId });
  };

  return (
    <div className="login">
      {isSubmitted && otpReferenceId ? (
        <>
          <h1>Enter OTP</h1>
          <span>
            Please enter the 4 digit code sent at {number}{" "}
            <Button inline type="button" onClick={() => setIsSubmitted(false)}>
              Edit
            </Button>
          </span>
          <form onSubmit={submitOtp}>
            <Otp length={otpLength} otp={otp} setOtp={setOtp} />
            {error && <Error message={error} />}
            <Button type="submit" primary loading={isLoading}>
              Verify OTP
            </Button>
          </form>
        </>
      ) : (
        <>
          <h1>Log In</h1>
          <span>Use your registered phone number</span>
          <form onSubmit={submitMobile}>
            <Input
              fillWidth
              maxLength={12}
              value={formatMobileInput(number)}
              onChange={({ target }) => {
                setNumber(target.value);
              }}
            />
            <Button
              type="submit"
              primary
              disabled={number.length !== 12}
              loading={isLoading}
            >
              SIGN IN
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
