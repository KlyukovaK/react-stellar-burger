export function price(arrIngredient) {
  if (arrIngredient.length === 0) {
    return 0;
  }
  return arrIngredient.reduce((acc, curr) => {
    if (curr.type === "bun") {
      return acc + 2 * curr.price;
    }
    return acc + curr.price;
  }, 0);
}
