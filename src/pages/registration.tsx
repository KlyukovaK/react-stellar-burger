import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../utils/hooks";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PersonalAccount } from "../components/personal-account/personal-account";
import { registerUser, setFormVale } from "../services/actions/auth";

export function Registration() {
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = (): void => {
    setTimeout(() => inputRef.current?.focus(), 0);
    alert("Icon Click Callback");
  };
  const navigate = useNavigate();

  const { email, password, name } = useSelector(
    (state) => state.formAuthReducer.form,
  );
  const dispatch = useDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(registerUser(email, password, name));
  };
  const setForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const el = e.target as HTMLInputElement;
    dispatch(setFormVale(el.name, el.value));
  };

  return (
    <PersonalAccount title="Регистрация" onFormSubmit={onFormSubmit}>
      <Input
        type="text"
        placeholder="Имя"
        onChange={setForm}
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
      <Button htmlType="submit" type="primary" size="medium">
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
          onClick={(): void => navigate("/login")}
        >
          Войти
        </Button>
      </div>
    </PersonalAccount>
  );
}
