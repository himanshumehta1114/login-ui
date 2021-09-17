import logo from "../images/logo.png";
import "./header.css"

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

export default Header;
