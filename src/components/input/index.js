import "./input.css";

/**
 * Renders input component with following props
 * 
 * @param {object} props - Input props
 * @param {boolean} props.fillWidth - Input takes the parent width
 * @param {object} props.props - pass remaining props to the render element
 * @returns Input component
 */
const Input = ({ fillWidth, ...props }) => {
  const classes = ["input"];

  if (fillWidth) {
    classes.push("input__fillWidth");
  }

  return <input {...props} className={classes.join(" ")} type="text" />;
};

export default Input;
