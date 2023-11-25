import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";

function Header() {
  const [isActive, setIsActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsActive("Constructor");
    } else if (location.pathname === "/feed") {
      setIsActive("HistoryOfOrders");
    } else if (location.pathname === "/profil") {
      setIsActive("Profil");
    } else {
      setIsActive("Profil");
    }
  }, [location.pathname]);
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.box}>
        <nav className={appHeaderStyles.links}>
          <NavLink to="/" className={appHeaderStyles.link}>
            <BurgerIcon
              type={isActive === "Constructor" ? "primary" : "secondary"}
            />
            <span
              className={`text text_type_main-default ml-2 ${
                isActive === "Constructor" ? "" : "text_color_inactive"
              }`}
            >
              Конструктор
            </span>
          </NavLink>
          <NavLink
            to="/feed"
            className={`${appHeaderStyles.link} text text_type_main-default`}
          >
            <ListIcon
              type={isActive === "HistoryOfOrders" ? "primary" : "secondary"}
            />
            <span
              className={`text text_type_main-default ml-2 ${
                isActive === "HistoryOfOrders" ? "" : "text_color_inactive"
              }`}
            >
              Лента заказов
            </span>
          </NavLink>
        </nav>
        <NavLink to="/">
          <Logo />
        </NavLink>
        <NavLink
          className={`${appHeaderStyles.link} text text_type_main-default`}
          to="/profile"
        >
          <ProfileIcon type={isActive === "Profil" ? "primary" : "secondary"} />
          <span
            className={`text text_type_main-default ml-2 ${
              isActive === "Profil" ? "" : "text_color_inactive"
            }`}
          >
            Личный кабинет
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
