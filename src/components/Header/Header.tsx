import { NavLink } from "react-router-dom";
import css from "./Header.module.css"
import clsx from "clsx";


const Header = () => {
  return (
    <>
      <header className={css.header}>
        <nav className={css.navigation}>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to={"/editUsers"}
          >
            Edit Users
          </NavLink>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to={"/users"}
          >
            Users
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Header;
