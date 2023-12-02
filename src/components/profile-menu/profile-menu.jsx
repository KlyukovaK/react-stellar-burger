import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../../services/actions/auth";
import profileMenuStyles from "./profile-menu.module.css";

export function ProfileMenu() {
  const [isActive, setIsActive] = useState("Profil");
  const dispatch = useDispatch();
  const location = useLocation();
  const onExitClick = () => {
    dispatch(logout());
    setIsActive("Exit");
  };
  useEffect(() => {
    if (location.pathname === "/profile/orders") {
      setIsActive("HistoryOfOrders");
    } else if (location.pathname === "/profil") {
      setIsActive("Profil");
    }
  }, [location]);

  return (
    <>
      <nav
        className={`${profileMenuStyles.links} ${
          isActive === "HistoryOfOrders"
            ? `${profileMenuStyles.linksHistory}`
            : ""
        }`}
      >
        <NavLink
          to="/profile"
          onClick={() => setIsActive("Profil")}
          className={profileMenuStyles.link}
        >
          <span
            className={`text text_type_main-medium ${
              isActive === "Profil" ? "" : "text_color_inactive"
            }`}
          >
            Профиль
          </span>
        </NavLink>
        <NavLink
          to="/profile/orders"
          onClick={() => setIsActive("HistoryOfOrders")}
          className={profileMenuStyles.link}
        >
          <span
            className={`text text_type_main-medium ${
              isActive === "HistoryOfOrders" ? "" : "text_color_inactive"
            }`}
          >
            История заказов
          </span>
        </NavLink>
        <NavLink
          to="/login"
          className={profileMenuStyles.link}
          onClick={onExitClick}
        >
          <span
            className={`text text_type_main-medium ${
              isActive === "Exit" ? "" : "text_color_inactive"
            }`}
          >
            Выход
          </span>
        </NavLink>
      </nav>
      <p
        className={`${profileMenuStyles.caption} text text_type_main-small text_color_inactive`}
      >
        {isActive === "HistoryOfOrders"
          ? "В этом разделе вы можете просмотреть свою историю заказов"
          : "В этом разделе вы можете изменить свои персональные данные"}
      </p>
    </>
  );
}
