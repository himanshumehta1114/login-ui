import {memo} from "react"
import logo from "../../images/logo.png";
import "./header.css"

/**
 * Renders the Header component with Brand logo
 * @returns 
 */
const Header = () => {
  return (
    <header className="header">
      <img
        src={logo}
        className="header__logo"
        alt="navi logo"
        aria-label="navi logo"
      />
    </header>
  );
};

export default memo(Header);
