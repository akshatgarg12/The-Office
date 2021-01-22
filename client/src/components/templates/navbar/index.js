import "./style.css";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../../../context/UserContextProvider";
import { logout } from "../../../actions/logout";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const [icon, setIcon] = useState("envelope");
  const mobileNav = useRef();
  var navLinks = ["Login"];
  if (state.user) {
    navLinks = ["Discussion", "Search", "Dashboard", "Kanban"];
    if (state.user.isAdmin) {
      navLinks = ["Discussion", "Search", "Dashboard", "Admin","Kanban"];
    }
  }
  // const logoLink = state.user ? '/dashboard' : '/';
  const logoLink = "/";
  const clickHandler = () => logout(dispatch);
  const hideLinks = () => {
    mobileNav.current.classList.toggle("hidden");
    if (icon === "envelope") setIcon("envelope open outline");
    else setIcon("envelope");
  };
  return (
    <nav>
      <Link to={logoLink}>
        <h1 className="logo">The Office</h1>
      </Link>
      {navLinks.length > 1 ? (
        <div>
          <ul className="nav-links">
            {navLinks.map((link, idx) => {
              return (
                <Link className="link" to={`/${link.toLowerCase()}`} key={idx}>
                  <li>{link}</li>
                </Link>
              );
            })}
            {state.user ? <li onClick={clickHandler}>Logout</li> : null}
          </ul>

          <div className="nav-burger" onClick={hideLinks}>
            <Icon name={icon} />
            <ul className="nav-burger-links hidden" ref={mobileNav}>
              {navLinks.map((link, idx) => {
                return (
                  <Link
                    className="link"
                    to={`/${link.toLowerCase()}`}
                    key={idx}
                  >
                    <li>{link}</li>
                  </Link>
                );
              })}
              {state.user ? (
                <li className="link" onClick={clickHandler}>
                  Logout
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : (
        navLinks.map((link, idx) => {
          console.log(link);
          return (
            <Link
              className="single-link"
              to={`/${link.toLowerCase()}`}
              key={idx}
            >
              <li>{link}</li>
            </Link>
          );
        })
      )}
    </nav>
  );
};

export default Navbar;
