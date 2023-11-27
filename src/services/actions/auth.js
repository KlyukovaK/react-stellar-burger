import {
  loginRequest,
  register,
  getUser,
  logoutUser,
  changePassword,
} from "../../utils/burger-api";

export const FORM_SET_VALUE = "FORM_SET_VALUE";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const LOGIN_USER_SUBMIT = "LOGIN_USER_SUBMIT";
export const LOGIN_USER_SUBMIT_SUCCESS = "LOGIN_USER_SUBMIT_SUCCESS";
export const LOGIN_USER_SUBMIT_FAILED = "LOGIN_USER_SUBMIT_FAILED";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setFormVale = (field, value) => {
  return {
    type: FORM_SET_VALUE,
    field,
    value,
  };
};

export const loginUser = (email, password) => {
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

export const getDataUser = () => {
  return (dispatch) => {
    return getUser()
      .then((res) => {
        console.log(res);
        dispatch(setUser(res.user));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const checkUserAuth = () => {
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

export const registerUser = (email, password, name) => {
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

export const logout = () => {
  return (dispatch) => {
    return logoutUser().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};

export const changePasswordUser = (password, token) => {
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
