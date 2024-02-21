import { TIngredientData } from "./types/data";

export function price(arrIngredient: Array<TIngredientData>) {
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

export const status = (order: { status: string }) => {
  if (order.status === "done") {
    return "Выполнен";
  }
  if (order.status === "pending") {
    return "Готовиться";
  }
  return "Создан";
};
