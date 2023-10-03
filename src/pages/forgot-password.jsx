import { useState } from "react";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PersonalAccount } from "../components/personal-account/personal-account";

export function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <PersonalAccount title="Восстановление пароля">
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        placeholder="Укажите e-mail"
        isIcon={false}
      />
      <Button htmlType="button" type="primary" size="medium">
        Восстановить
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
