import {
  ADD_INGREDIENTS,
  DELETE_INGREDIENTS,
} from "../actions/burgerConstructor";

const initialAddIngredientState = { ingredient: [] };

export const ingredientsReducer = (
  state = initialAddIngredientState,
  action = {},
) => {
  switch (action.type) {
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredient: [...state.ingredient, action.payload],
      };
    case DELETE_INGREDIENTS:
      return {
        ...state,
        ingredient: state.ingredient.filter(
          (ingredient) => ingredient._id !== action.payload,
        ),
      };
    default:
      return initialAddIngredientState;
  }
};
