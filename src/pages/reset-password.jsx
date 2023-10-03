import { useState, useRef } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PersonalAccount } from "../components/personal-account/personal-account";

export function ResetPassword() {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <PersonalAccount title="Восстановление пароля">
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
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
      <Button htmlType="button" type="primary" size="medium">
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
        >
          Войти
        </Button>
      </div>
    </PersonalAccount>
  );
}
