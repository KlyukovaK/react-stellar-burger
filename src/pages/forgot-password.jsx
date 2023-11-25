import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PersonalAccount } from "../components/personal-account/personal-account";
import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  setFormVale,
} from "../services/actions/auth";
import { forgotPassword } from "../utils/burger-api";

export function ForgotPassword() {
  const navigate = useNavigate();
  // const location = useLocation();
  const { email } = useSelector((state) => state.formAuthReducer.form);

  const dispatch = useDispatch();
  const setForm = (e) => {
    dispatch(setFormVale(e.target.name, e.target.value));
  };
  const onFormSubmit = (e) => {
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

  // useEffect(() => {
  //   if (forgotPasswordSucces && location.pathname === "forgot-password") {
  //     navigate("/reset-password");
  //   }
  // }, [forgotPasswordSucces]);

  return (
    <PersonalAccount title="Восстановление пароля" onFormSubmit={onFormSubmit}>
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
    </PersonalAccount>
  );
}
