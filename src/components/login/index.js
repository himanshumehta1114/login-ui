import { useState } from "react";
import "./login.css";
import Input from "../input";
import Button from "../button";
import { formatMobile } from "../../helpers";

const Login = () => {
  const [number, setNumber] = useState("");

  return (
    <div className="login">
      {false ? (
        <>
          <h1>Enter OTP</h1>
          <span>
            Please enter the 4 digit code sent at {number} <button>Edit</button>
          </span>
        </>
      ) : (
        <>
          <h1>Log In</h1>
          <span>Use your registered phone number</span>
          <form className="login__form">
            <Input
              maxLength={12}
              value={number}
              onChange={({ target }) => setNumber(formatMobile(target.value))}
            />
            <Button />
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
