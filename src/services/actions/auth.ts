import {
  loginRequest,
  register,
  getUser,
  logoutUser,
  changePassword,
} from "../../utils/burger-api";
import { TUser } from "../../utils/types/data";
import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORM_SET_VALUE,
  LOGIN_USER_SUBMIT,
  LOGIN_USER_SUBMIT_FAILED,
  LOGIN_USER_SUBMIT_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  SET_AUTH_CHECKED,
  SET_USER,
} from "../constants/auth";
import { TAppThunk } from "../store";

export interface IFormSetValueAction {
  readonly type: typeof FORM_SET_VALUE;
  field: string;
  value: string;
}
export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
}
export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}
export interface ILoginUserSubmitAction {
  readonly type: typeof LOGIN_USER_SUBMIT;
}
export interface ILoginUserSubmitSuccessAction {
  readonly type: typeof LOGIN_USER_SUBMIT_SUCCESS;
}
export interface ILoginUserSubmitFailedAction {
  readonly type: typeof LOGIN_USER_SUBMIT_FAILED;
}
export interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}
export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: TUser | null;
}
export interface IForgotPasswordRequestAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export interface IForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export interface IChangePasswordRequestAction {
  readonly type: typeof CHANGE_PASSWORD_REQUEST;
}
export interface IChangePasswordSuccessAction {
  readonly type: typeof CHANGE_PASSWORD_SUCCESS;
}
export interface IChangePasswordFailedAction {
  readonly type: typeof CHANGE_PASSWORD_FAILED;
}

export type TAuthAction =
  | IFormSetValueAction
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginUserSubmitAction
  | ILoginUserSubmitSuccessAction
  | ILoginUserSubmitFailedAction
  | ISetAuthCheckedAction
  | ISetUserAction
  | IForgotPasswordRequestAction
  | IForgotPasswordSuccessAction
  | IForgotPasswordFailedAction
  | IChangePasswordRequestAction
  | IChangePasswordSuccessAction
  | IChangePasswordFailedAction;

export const setAuthChecked = (value: boolean): ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TUser | null): ISetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const setFormVale = (
  field: string,
  value: string,
): IFormSetValueAction => {
  return {
    type: FORM_SET_VALUE,
    field,
    value,
  };
};

export const loginUser = (email: string, password: string): TAppThunk => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUBMIT_SUCCESS,
    });
    loginRequest(email, password)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: LOGIN_USER_SUBMIT,
          form: {
            email: res.user.email,
            password: res.user.password,
          },
        });
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOGIN_USER_SUBMIT_FAILED,
        });
      });
  };
};

export const getDataUser = (): TAppThunk<Promise<unknown>> => {
  return (dispatch) => {
    return getUser()
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkUserAuth = (): TAppThunk => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getDataUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const registerUser = (
  email: string,
  password: string,
  name: string,
): TAppThunk => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    register(email, password, name)
      .then((res) => {
        console.log(res);
        dispatch({
          type: REGISTER_USER_SUCCESS,
          form: {
            email: res.user.email,
            password: res.user.password,
            name: res.user.name,
          },
        });
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: REGISTER_USER_FAILED,
        });
      });
  };
};

export const logout = (): TAppThunk => {
  return (dispatch) => {
    return logoutUser().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};

export const changePasswordUser = (
  password: string,
  token: string | number,
): TAppThunk => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
    });
    changePassword(password, token)
      .then((res) => {
        console.log(res);
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: CHANGE_PASSWORD_FAILED,
        });
      });
  };
};
