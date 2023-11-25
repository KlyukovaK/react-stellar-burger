import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from "./profile.module.css";
import { logout, setUser } from "../../services/actions/auth";
import { changeProfile } from "../../utils/burger-api";

export function Profile() {
  const { user } = useSelector((store) => store.formAuthReducer);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [login, setLogin] = useState(user.email);
  const [password, setPassword] = useState("......");
  const [isActive, setIsActive] = useState("Profil");

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const onExitClick = () => {
    dispatch(logout());
    setIsActive("Exit");
  };
  const changeButton = () => {
    if (name !== user.name || login !== user.email) {
      return true;
    }
    return false;
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    changeProfile(name, login).then((res) => {
      console.log(res);
      dispatch(setUser(res.user));
    });
  };

  useEffect(() => {
    changeButton();
  }, [name, login]);

  return (
    <main className={profileStyles.main}>
      <nav className={profileStyles.links}>
        <NavLink
          to="/profile"
          onClick={() => setIsActive("Profil")}
          className={profileStyles.link}
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
          className={profileStyles.link}
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
          className={profileStyles.link}
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
        className={`${profileStyles.caption} text text_type_main-small text_color_inactive`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
      <form className={profileStyles.form} onSubmit={onFormSubmit}>
        <div className={profileStyles.inputs}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => {
              setName(e.target.value);
            }}
            icon="EditIcon"
            value={name}
            name="name"
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText="Ошибка"
            size="default"
            extraClass="ml-1"
          />
          <Input
            type="text"
            placeholder="Логин"
            onChange={(e) => setLogin(e.target.value)}
            icon="EditIcon"
            value={login}
            name="name"
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText="Ошибка"
            size="default"
            extraClass="ml-1"
          />
          <PasswordInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            icon="EditIcon"
          />
        </div>
        {changeButton() && (
          <div className={profileStyles.buttons}>
            <Button
              htmlType="button"
              type="secondary"
              size="large"
              onClick={() => {
                setLogin(user.email);
                setName(user.name);
              }}
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </main>
  );
}
