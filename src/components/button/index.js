import { memo } from "react";
import "./button.css";

/**
 * Spinner component to illustrate loading state in Button component
 */
const Spinner = (props) => (
  <svg
    {...props}
    className="button__spinner"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"></path>
  </svg>
);

export function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  )
}

/**
 * renders button component with the following proptypes
 *
 * @param {object} props
 * @param {boolean} props.primary - renders primary button
 * @param {boolean} props.inline - renders inline button
 * @param {boolean} props.disabled - disables button clicks and renders disabled button styles
 * @param {boolean} props.loading - renders Spinner and disabled the Button
 * @param {object} props.rest - passes the remaining props to the render element
 * @returns
 */
const Button = ({ primary, inline, disabled, loading, children, ...rest }) => {
  const classes = ["button"];

  if (primary) {
    classes.push("button__primary");
  }

  if (inline) {
    classes.push("button__inline");
  }

  if (disabled || loading) {
    classes.push("button__disabled");
  }

  return (
    <button
      className={classes.join(" ")}
      disabled={disabled || loading}
      {...rest}
    >
      {children} {loading && <Spinner style={{ marginLeft: "0.5rem" }} />}
    </button>
  );
};

export default memo(Button);
