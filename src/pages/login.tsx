import React from "react";
import { useSelector, useDispatch } from "../utils/hooks";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser, setFormVale } from "../services/actions/auth";
import { PersonalAccount } from "../components/personal-account/personal-account";

export function Login() {
  const navigate = useNavigate();
  const { email, password } = useSelector(
    (state) => state.formAuthReducer.form,
  );
  const dispatch = useDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  const setForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const el = e.target as HTMLInputElement;
    dispatch(setFormVale(el.name, el.value));
  };

  return (
    <PersonalAccount title="Вход" onFormSubmit={onFormSubmit}>
      <EmailInput
        onChange={setForm}
        value={email}
        name="email"
        isIcon={false}
      />
      <PasswordInput
        onChange={setForm}
        value={password}
        name="password"
        extraClass="mb-2"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        onClick={(): void => navigate(-1)}
      >
        Войти
      </Button>
      <div className="mt-20">
        <span className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
        </span>
        <Button
          htmlType="button"
          type="secondary"
          size="large"
          style={{ padding: 0, paddingLeft: "8px" }}
          onClick={(): void => navigate("/register")}
        >
          Зарегистрироваться
        </Button>
      </div>
      <div>
        <span className="text text_type_main-default text_color_inactive">
          Забыли пароль?
        </span>
        <Button
          htmlType="button"
          type="secondary"
          size="large"
          style={{ padding: 0, paddingLeft: "8px" }}
          onClick={(): void => navigate("/forgot-password")}
        >
          Восстановить пароль
        </Button>
      </div>
    </PersonalAccount>
  );
}
