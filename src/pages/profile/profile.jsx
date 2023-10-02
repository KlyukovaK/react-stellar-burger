import { useState, useRef } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from "./profile.module.css";

export function Profile() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");

  const onChange = (e) => {
    setPassword(e.target.value);
  };
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <main className={profileStyles.main}>
      <nav className={profileStyles.links}>
        <a href="/" className={profileStyles.link}>
          <span className="text text_type_main-medium">Профиль</span>
        </a>
        <a href="/" className={profileStyles.link}>
          <span className="text text_type_main-medium text_color_inactive">
            История заказов
          </span>
        </a>
        <a href="/" className={profileStyles.link}>
          <span className="text text_type_main-medium text_color_inactive">
            Вход
          </span>
        </a>
      </nav>
      <p
        className={`${profileStyles.caption} text text_type_main-small text_color_inactive`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
      <div className={profileStyles.inputs}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
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
          onChange={onChange}
          value={password}
          name="password"
          icon="EditIcon"
        />
      </div>
      <div className={profileStyles.buttons}>
        <Button htmlType="button" type="secondary" size="large">
          Отмена
        </Button>
        <Button htmlType="button" type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </main>
  );
}
