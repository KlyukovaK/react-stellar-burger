import { TIngredientData, TOrderCard, TUser } from "./types/data";

const checkPromise = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const baseUrl = "https://norma.nomoreparties.space/api";
const authUrl = `${baseUrl}/auth`;

type TGetIngredients = {
  success: boolean;
  data: Array<TIngredientData>;
};

function getIngredients(): Promise<TGetIngredients> {
  return fetch(`${baseUrl}/ingredients`).then((res) => checkPromise(res));
}
type TOrder = {
  success: boolean;
  order: TOrderCard;
  name: string;
};
function getOrderApi(idIngredient: string[]): Promise<TOrder> {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: String(localStorage.getItem("accessToken")),
    },
    body: JSON.stringify({
      ingredients: idIngredient,
    }),
  }).then((res) => checkPromise(res));
}

type TGetOrderDitale = {
  success: boolean;
  orders: Array<TOrderCard>;
};

function getOrderDitale(number: string | undefined): Promise<TGetOrderDitale> {
  return fetch(`${baseUrl}/orders/${number}`).then((res) => checkPromise(res));
}
type TLoginRequest = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
};
// запрос авторизаци
const loginRequest = (
  email: string,
  password: string,
): Promise<TLoginRequest> => {
  return fetch(`${authUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkPromise(res));
};
// запрос регистрации
const register = (
  email: string,
  password: string,
  name: string,
): Promise<TLoginRequest> => {
  return fetch(`${authUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkPromise(res));
};
// запрос на востановление пароля
const forgotPassword = (email: string) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((res) => checkPromise(res));
};
// запрос на перезапись пароля
const changePassword = (password: string, token: string | number) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  }).then((res) => checkPromise(res));
};
// запрос для выхода из системы
const logoutUser = () => {
  return fetch(`${authUrl}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then((res) => checkPromise(res));
};

type TAuth = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};
// токен для выхода из системы и для получения нового токина.
const refreshToken = (): Promise<TAuth> => {
  return fetch(`${authUrl}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => checkPromise<TAuth>(res));
};
type TError = Error & {
  message?: string;
};

type TOptions = RequestInit & {
  headers: HeadersInit & {
    authorization?: string | null;
  };
};
const fetchWithRefresh = async <T>(
  url: string,
  options: TOptions,
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return checkPromise(res);
  } catch (err) {
    if ((err as TError).message === "jwt expired") {
      const refreshData: TAuth = await refreshToken(); // обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); // повторяем запрос
      return checkPromise(res);
    }
    return Promise.reject(err);
  }
};
// запрос на получение данных пользователя
const getUser = (): Promise<TLoginRequest> => {
  return fetchWithRefresh(`${authUrl}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: String(localStorage.getItem("accessToken")),
    },
  });
};
// запрос на изменения в профиле
const changeProfile = (
  name: string,
  email: string,
  password: string,
): Promise<TLoginRequest> => {
  return fetchWithRefresh(`${authUrl}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: String(localStorage.getItem("accessToken")),
    },
    body: JSON.stringify({ name, email, password }),
  });
};

export {
  getIngredients,
  getOrderApi,
  refreshToken,
  fetchWithRefresh,
  loginRequest,
  register,
  logoutUser,
  forgotPassword,
  changePassword,
  getUser,
  changeProfile,
  getOrderDitale,
};
