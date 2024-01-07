import React, { useEffect, useRef, useState } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../utils/hooks";
import profileStyles from "./profile.module.css";
import { setUser } from "../../services/actions/auth";
import { changeProfile } from "../../utils/burger-api";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";

export function Profile() {
  const { user } = useSelector((store) => store.formAuthReducer);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(user?.name!);
  const [login, setLogin] = useState<string>(user?.email!);
  const [password, setPassword] = useState<string>("....");

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  const changeButton = () => {
    if ((user && name !== user.name) || (user && login !== user.email)) {
      return true;
    }
    return false;
  };
  const onFormSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    changeProfile(name, login, password).then((res) => {
      console.log(res);
      dispatch(setUser(res.user));
    });
  };
  const onClick = () => {
    if (user) {
      setLogin(user.email);
      setName(user.name);
    }
  };
  useEffect(() => {
    changeButton();
  }, [name, login]);

  return (
    <main className={profileStyles.main}>
      <ProfileMenu />
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
              onClick={onClick}
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
