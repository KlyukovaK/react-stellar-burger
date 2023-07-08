const checkPromise = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function getIngredients(Url) {
  return fetch(Url).then((res) => {
    return checkPromise(res);
  });
}
export default getIngredients;
