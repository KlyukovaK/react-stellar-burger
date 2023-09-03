const checkPromise = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const baseUrl = "https://norma.nomoreparties.space/api";

export function getIngredients() {
  return fetch(`${baseUrl}/ingredients`).then((res) => {
    return checkPromise(res);
  });
}

export function getOrderApi(idIngredient) {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: idIngredient,
    }),
  }).then((res) => {
    return checkPromise(res);
  });
}
