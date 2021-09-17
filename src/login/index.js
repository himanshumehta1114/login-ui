import { useState } from "react";
import "./login.css";
import Input from "../components/input";
import Button from "../components/button";

const Login = () => {
  const [number, setNumber] = useState("");

  return (
    <div className="login">
      {number ? (
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
            <Input value={number} onChange={({target}) => setNumber(target.value)} />
            <Button />
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
