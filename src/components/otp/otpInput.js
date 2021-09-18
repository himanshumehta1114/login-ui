import { useLayoutEffect, useRef } from "react";

/**
 * Input component to accept OTP, this **MUST** be used in OTP component only.
 * Accepts following props:
 * 
 * @param {object} props - Otp input props
 * @param {boolean} props.focus - focuses input field
 * @param {boolean} props.autoFocus - autoFocus first input on mount
 * @param {object} props.props - remaining props to pass to rendered input field
 * @returns OTPInput component
 */
const OtpInput = ({ focus, autoFocus, ...props }) => {
    const inputRef = useRef(null);
  
    // optimise to focus input before updating effects
    useLayoutEffect(() => {
      if (inputRef.current) {
        if (focus && autoFocus) {
          inputRef.current.focus();
        }
      }
    }, [focus, autoFocus, inputRef]);
  
    return (
      <input
        ref={inputRef}
        maxLength={1}
        size={1}
        className="otp__input"
        {...props}
      />
    );
  };

export default OtpInput