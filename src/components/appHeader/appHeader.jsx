import React from "react";
import appHeaderStyles from "./appHeader.module.css";
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
        <div className={appHeaderStyles.box}>
          <nav className={appHeaderStyles.links}>
            <a href="#" className= {appHeaderStyles.link}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </a>
            <a href="#" className= {`${appHeaderStyles.link} text text_type_main-default`}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default ml-2 text_color_inactive">Лента заказов</span>
            </a>
          </nav>
          <Logo />
          <a href="#" className= {`${appHeaderStyles.link} text text_type_main-default`}>
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default ml-2 text_color_inactive">Личный кабинет</span>
          </a>
        </div>
      </header>
    );
  }
}
export default Header;
