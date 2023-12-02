import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from "./profile.module.css";
import { setUser } from "../../services/actions/auth";
import { changeProfile } from "../../utils/burger-api";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";

export function Profile() {
  const { user } = useSelector((store) => store.formAuthReducer);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [login, setLogin] = useState(user.email);
  const [password, setPassword] = useState("....");

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const changeButton = () => {
    if (name !== user.name || login !== user.email) {
      return true;
    }
    return false;
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    changeProfile(name, login, password).then((res) => {
      console.log(res);
      dispatch(setUser(res.user));
    });
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
