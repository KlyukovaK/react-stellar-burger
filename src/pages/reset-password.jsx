import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [code, setCode] = useState("");
  const { password } = useSelector((state) => state.formAuthReducer.form);
  const inputRef = useRef(null);
  const setForm = (e) => {
    dispatch(setFormVale(e.target.name, e.target.value));
  };

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(changePasswordUser(password, code));
    setCode("");
    navigate("/login");
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
        onChange={(e) => setCode(e.target.value)}
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
          onClick={() => navigate("/login")}
        >
          Войти
        </Button>
      </div>
    </PersonalAccount>
  );
}
