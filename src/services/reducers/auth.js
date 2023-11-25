import {
  FORM_SET_VALUE,
  LOGIN_USER_SUBMIT,
  LOGIN_USER_SUBMIT_SUCCESS,
  LOGIN_USER_SUBMIT_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  SET_AUTH_CHECKED,
  SET_USER,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
} from "../actions/auth";

const initialForm = {
  form: {
    name: "",
    password: "",
    email: "",
  },
  user: null,
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
  isAuthChecked: false,
  forgotRequest: false,
  forgotFailed: false,
  changePasswordRequest: false,
  changePasswordFailed: false,
  forgotPasswordSucces: false,
};

export const formAuthReducer = (state = initialForm, action = {}) => {
  switch (action.type) {
    case FORM_SET_VALUE: {
      // заполнение форм
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
      };
    }
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case LOGIN_USER_SUBMIT: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_USER_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: { ...initialForm.form },
        loginRequest: false,
      };
    }
    case LOGIN_USER_SUBMIT_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        form: { ...initialForm.form },
        registerRequest: false,
      };
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        registerRequest: false,
      };
    }
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotRequest: true,
        forgotFailed: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        form: { ...initialForm.form },
        forgotPasswordSucces: true,
        forgotRequest: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotFailed: true,
        forgotRequest: false,
      };
    }
    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordSucces: true,
        changePasswordFailed: false,
        changePasswordRequest: true,
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        form: { ...initialForm.form },
        changePasswordRequest: false,
        forgotPasswordSucces: false,
      };
    }
    case CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordSucces: true,
        changePasswordFailed: true,
        changePasswordRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
