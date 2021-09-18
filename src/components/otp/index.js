import { useLayoutEffect, useRef, useState } from "react";
import "./otp.css";

const OtpInput = ({ focus, autoFocus, ...props }) => {
  const inputRef = useRef(null);

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

const Otp = ({ length, otp, setOtp, ...rest }) => {
  const [activeInput, setActiveInput] = useState(0);

  const handleOnChange = (e) => {
    const {
      target: { value },
    } = e;

    if (!value) {
      return;
    }

    let newOtpVal = [...otp];
    newOtpVal[activeInput] = value;

    setOtp(newOtpVal);
    focusNext();
  };

  const focusInput = (idx) => {
    // input should remain in 0 to otp length range
    const selectedIdx = Math.max(Math.min(length - 1, idx), 0);
    setActiveInput(selectedIdx);
  };

  const focusNext = () => {
    focusInput(activeInput + 1);
  };

  const focusPrev = () => {
    focusInput(activeInput - 1);
  };

  const removeCode = () => {
    let newOtpVal = [...otp];
    newOtpVal[activeInput] = "";

    setOtp(newOtpVal);
  };

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
