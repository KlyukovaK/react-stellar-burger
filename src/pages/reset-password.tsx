import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "../utils/hooks";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PersonalAccount } from "../components/personal-account/personal-account";
import { changePasswordUser, setFormVale } from "../services/actions/auth";

export function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [code, setCode] = useState<string>("");
  const { password } = useSelector((state) => state.formAuthReducer.form);
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = (): void => {
    setTimeout(() => inputRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(changePasswordUser(password, code));
    setCode("");
    navigate("/login");
  };
  const setForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const el = e.target as HTMLInputElement;
    dispatch(setFormVale(el.name, el.value));
  };
  return (
    <PersonalAccount title="Восстановление пароля" onFormSubmit={onFormSubmit}>
      <PasswordInput
        onChange={setForm}
        value={password}
        placeholder="Введите новый пароль"
        name="password"
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setCode(e.target.value)
        }
        value={code}
        name="name"
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText="Ошибка"
        size="default"
        extraClass="ml-1"
      />
      <Button htmlType="submit" type="primary" size="medium">
        Сохранить
      </Button>
      <div className="mt-20 mb-4">
        <span className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </span>
        <Button
          htmlType="button"
          type="secondary"
          size="large"
          style={{ padding: 0, paddingLeft: "8px" }}
          onClick={(): void => navigate("/login")}
        >
          Войти
        </Button>
      </div>
    </PersonalAccount>
  );
}
