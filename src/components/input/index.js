import "./input.css";

const Input = ({ fillWidth, center, textSize, isOtp, ...props }) => {
  const classes = ["input"];

  if (fillWidth) {
    classes.push("input__fillWidth");
  }

  if (center) {
    classes.push("input__center");
  }

  if (textSize) {
    classes.push(`input__${textSize}`);
  }

  if (isOtp) {
    classes.push(`input__otp`);
  }

  return <input {...props} className={classes.join(" ")} type="text" />;
};

export default Input;
