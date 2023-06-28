import React from "react";
import appHeaderStyles from "./appHeader.mobule.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
class Header extends React.Component {
  render() {
    return (
      <header className={appHeaderStyles.header}>
        <nav>
          <a>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </a>
          <a>
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </a>
        </nav>
        <Logo />
        <a>
          <ProfileIcon type="secondary" />
          <span>Личный кабинет</span>
        </a>
      </header>
    );
  }
}
export default Header;
