import { useRef } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PersonalAccount } from "../components/personal-account/personal-account";
import { registerUser, setFormVale } from "../services/actions/auth";

export function Registration() {
  const inputRef = useRef(null);
  const location = useLocation();
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const navigate = useNavigate();

  const { email, password, name } = useSelector(
    (state) => state.formAuthReducer.form,
  );
  const { registerSuccess } = useSelector((state) => state.formAuthReducer);
  const dispatch = useDispatch();
  const setForm = (e) => {
    dispatch(setFormVale(e.target.name, e.target.value));
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, name));
  };
  const onClick = () => {
    if (registerSuccess) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return console.log("не верная регистрация");
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
      <Button htmlType="submit" type="primary" size="medium" onClick={onClick}>
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
          onClick={() => navigate("/login")}
        >
          Войти
        </Button>
      </div>
    </PersonalAccount>
  );
}
