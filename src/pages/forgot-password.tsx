import React from "react";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../utils/hooks";
import { PersonalAccount } from "../components/personal-account/personal-account";
import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
} from "../services/constants/auth";
import { setFormVale } from "../services/actions/auth";
import { forgotPassword } from "../utils/burger-api";

export function ForgotPassword() {
  const navigate = useNavigate();

  const { email } = useSelector((state) => state.formAuthReducer.form);

  const dispatch = useDispatch();
  const setForm = (e: React.SyntheticEvent): void => {
    const el = e.target as HTMLInputElement;
    dispatch(setFormVale(el.name, el.value));
  };
  const onFormSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPassword(email)
      .then(() => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
    navigate("/reset-password");
  };

  return (
    <PersonalAccount title="Восстановление пароля" onFormSubmit={onFormSubmit}>
      <>
        <EmailInput
          onChange={setForm}
          value={email}
          name="email"
          placeholder="Укажите e-mail"
          isIcon={false}
        />
        <Button htmlType="submit" type="primary" size="medium">
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
            onClick={() => navigate("/login")}
          >
            Войти
          </Button>
        </div>
      </>
    </PersonalAccount>
  );
}
