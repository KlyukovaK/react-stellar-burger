const checkPromise = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const baseUrl = "https://norma.nomoreparties.space/api";
const authUrl = `${baseUrl}/auth`;

function getIngredients() {
  return fetch(`${baseUrl}/ingredients`).then(checkPromise);
}

function getOrderApi(idIngredient) {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: idIngredient,
    }),
  }).then(checkPromise);
}
// запрос авторизаци
const loginRequest = (email, password) => {
  return fetch(`${authUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkPromise);
};
// запрос регистрации
const register = (email, password, name) => {
  return fetch(`${authUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then(checkPromise);
};
// запрос на востановление пароля
const forgotPassword = (email) => {
  return fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then(checkPromise);
};
// запрос на перезапись пароля
const changePassword = (password, token) => {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  }).then(checkPromise);
};
// запрос для выхода из системы
const logoutUser = () => {
  return fetch(`${authUrl}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  }).then(checkPromise);
};
// токен для выхода из системы и для получения нового токина.
const refreshToken = () => {
  return fetch(`${authUrl}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkPromise);
};
async function fetchWithRefresh(url, options) {
  try {
    const res = await fetch(url, options);
    return await checkPromise(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); // обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); // повторяем запрос
      return await checkPromise(res);
    }
    return Promise.reject(err);
  }
}
// запрос на получение данных пользователя
const getUser = () => {
  return fetchWithRefresh(`${authUrl}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};
// запрос на изменения в профиле
const changeProfile = (name, email, password) => {
  return fetchWithRefresh(`${authUrl}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: localStorage.getItem("accessToken"),
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
};
