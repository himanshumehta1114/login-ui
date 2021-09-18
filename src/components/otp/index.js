import { useCallback, useState } from "react";
import OtpInput from "./otpInput";
import "./otp.css";

/**
 * Renders component to accept OTP number of variable length
 * 
 * @param {object} props - otp component props
 * @param {number} length - length of otp
 * @param {number[]} otp - array of otp values
 * @param {object} setOtp - function to set otp in parent component
 * @returns 
 */
const Otp = ({ length, otp, setOtp, ...rest }) => {
  const [activeInput, setActiveInput] = useState(0);

  /**
   * focues field based on active input
   */
  const focusInput = useCallback(
    (idx) => {
      // input should remain in 0 to otp length range
      const selectedIdx = Math.max(Math.min(length - 1, idx), 0);
      setActiveInput(selectedIdx);
    },
    [length, setActiveInput]
  );

  /**
   * focuesses next input field
   */
  const focusNext = useCallback(() => {
    focusInput(activeInput + 1);
  }, [focusInput, activeInput]);

  /**
   * focusses previous input field
   */
  const focusPrev = useCallback(() => {
    focusInput(activeInput - 1);
  }, [focusInput, activeInput]);

  /**
   * sets otp value to otp prop on changing the otp input
   */
  const handleOnChange = useCallback(
    (e) => {
      if (!e.target.value) {
        return;
      }

      let newOtpVal = [...otp];
      newOtpVal[activeInput] = e.target.value;

      setOtp(newOtpVal);
      focusNext();
    },
    [activeInput, otp, setOtp, focusNext]
  );

  /**
   * removes otp from input
   */
  const removeCode = useCallback(() => {
    let newOtpVal = [...otp];
    newOtpVal[activeInput] = "";

    setOtp(newOtpVal);
  }, [setOtp, otp, activeInput]);

  console.log({otp})

  /**
   * handles focus and inputs of different key down actions, 
   * 
   * @param {object} e - event object
   * @returns 
   */
  const onKeyDown = (e) => {
    const { key } = e;
    if (key === "Backspace" || key === "Delete") {
      e.preventDefault();
      // check if value exists
      if (otp[activeInput].length) {
        removeCode();
        return;
      }

      focusPrev();
      return;
    }

    if (key === "ArrowLeft") {
      e.preventDefault();
      focusPrev();
      return;
    }

    if (key === "ArrowRight") {
      e.preventDefault();
      focusNext();
      return;
    }

    if (key === " ") {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className="otp">
      {Array(length)
        .fill("")
        .map((_, idx) => (
          <OtpInput
            autoFocus
            onChange={handleOnChange}
            key={`otp-${idx}`}
            focus={idx === activeInput}
            onKeyDown={onKeyDown}
            value={otp[idx]}
          />
        ))}
    </div>
  );
};

export default Otp;
