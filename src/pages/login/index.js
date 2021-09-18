import { useEffect, useState, memo } from "react";
import "./login.css";
import Input from "../../components/input";
import Button from "../../components/button";
import Otp from "../../components/otp";
import Error from "../../components/error";
import { formatMobileInput, formatMobileOutput } from "../../helpers/helpers";
import { useAuth } from "../../context/auth";
import Timer from "../../components/timer";

const Login = () => {
  const { generateOtp, validateOtp, otpReferenceId, resetGenOtp, isLoading } =
    useAuth();

  // otp
  const otpLength = 4;
  const initOtpVal = () => Array(otpLength).fill("");

  const [otp, setOtp] = useState(initOtpVal);

  // timer
  const timerDuration = { seconds: 30, minutes: 0 };
  const [timer, setTimer] = useState(false);
  const [timerReset, setTimerReset] = useState(false);

  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (otpReferenceId) {
      setTimer(true);
    }
  }, [otpReferenceId, setTimer]);

  /**
   * submits mobile number to the API
   *
   * @param {object} e - event object
   */
  const submitMobile = (e) => {
    e.preventDefault();

    generateOtp(formatMobileOutput(number));

    setIsSubmitted(true);
  };

  /**
   * submit OTP to the API
   *
   * @param {object} e - event object
   * @returns
   */
  const submitOtp = (e) => {
    e.preventDefault();

    const missedVals = otp.filter((_) => !_.length).length;

    setError(missedVals ? "Please enter complete OTP" : "");

    if (missedVals) {
      return;
    }

    validateOtp({ otp: otp.join(""), otpReferenceId });
  };

  /**
   * resets timer and submit state, enables updation of mobile number
   */
  const editNum = () => {
    setIsSubmitted(false);
    setTimer(false);
    resetGenOtp();
  };

  return (
    <div className="login">
      {isSubmitted && otpReferenceId ? (
        // Renders UI to input OTP
        <>
          <h1>Enter OTP</h1>
          <span>
            Please enter the 4 digit code sent at {number}{" "}
            <Button inline type="button" onClick={editNum}>
              Edit
            </Button>
          </span>

          <form onSubmit={submitOtp}>
            <Otp length={otpLength} otp={otp} setOtp={setOtp} />
            {error && <Error message={error} />}
            <p>
              {timer && !timerReset ? (
                <Timer
                  seconds={timerDuration.seconds}
                  minutes={timerDuration.minutes}
                  setReset={setTimerReset}
                />
              ) : timer && timerReset ? (
                <Button
                  inline
                  type="button"
                  onClick={() => console.log("Resent otp")}
                >
                  resend otp
                </Button>
              ) : null}
            </p>
            <Button type="submit" primary loading={isLoading}>
              Verify OTP
            </Button>
          </form>
        </>
      ) : (
        // Renders UI to input mobile number
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

export default memo(Login);
