const checkPromise = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients(url) {
  return fetch(url).then((res) => {
    return checkPromise(res);
  });
}

export function getOrderApi(url, idIngredient) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: idIngredient,
    }),
  }).then((res) => {
    return checkPromise(res);
  });
}
