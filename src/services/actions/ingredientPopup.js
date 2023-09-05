export const ADD_INGREDIENT_DETAIL = "ADD_INGREDIENT_DETAIL";
export const CLOSE_INGREDIENT_DETAIL = "CLOSE_INGREDIENT_DETAIL";

export const addIngredientDetail = (itemData) => {
  return {
    type: ADD_INGREDIENT_DETAIL,
    payload: itemData,
  };
};
