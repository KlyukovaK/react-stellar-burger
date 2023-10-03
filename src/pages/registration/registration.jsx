import { useState, useRef } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PersonalAccount } from "../../components/personal-account/personal-account";

export function Registration() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  return (
    <PersonalAccount title="Регистрация">
      <Input
        type="text"
        placeholder="Имя"
        onChange={(e) => setName(e.target.value)}
        value={name}
        name="name"
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText="Ошибка"
        size="default"
        extraClass="ml-1"
      />
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        isIcon={false}
      />
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
        extraClass="mb-2"
      />
      <Button htmlType="button" type="primary" size="medium">
        Зарегистрироваться
      </Button>
      <div className="mt-20 mb-4">
        <span className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
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
