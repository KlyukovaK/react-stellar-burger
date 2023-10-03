import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PersonalAccount } from "../components/personal-account/personal-account";

export function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <PersonalAccount title="Вход">
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
        >
          Восстановить пароль
        </Button>
      </div>
    </PersonalAccount>
  );
}
