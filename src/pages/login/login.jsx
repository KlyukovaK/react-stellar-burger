import { useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import loginStyles from "./login.module.css";

export function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <main className={loginStyles.main}>
      <h1 className="text text_type_main-large mb-6">Вход</h1>
      <div className={loginStyles.inputs}>
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
      </div>
      <Button htmlType="button" type="primary" size="medium">
        Войти
      </Button>
      <div className="mt-20 mb-4">
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
    </main>
  );
}
