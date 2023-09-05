import {
  ADD_INGREDIENTS,
  DELETE_INGREDIENTS,
  CHANGE_BUN,
  MOVE_ELEMENT,
} from "../actions/burgerConstructor";

const initialAddIngredientState = { bun: [], ingredient: [] };

export const ingredientsReducer = (
  state = initialAddIngredientState,
  action = {},
) => {
  switch (action.type) {
    case ADD_INGREDIENTS:
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: [...state.bun, action.payload],
        };
      }
      return {
        ...state,
        ingredient: [...state.ingredient, action.payload],
      };
    case CHANGE_BUN:
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: [action.payload],
        };
      }
      return {
        ...state,
      };
    case DELETE_INGREDIENTS:
      return {
        ...state,
        ingredient: state.ingredient.filter(
          (ingredient) => ingredient.key !== action.payload,
        ),
      };
    case MOVE_ELEMENT: {
      const { dragIndex } = action.payload;
      const { hoverIndex } = action.payload;
      const { ingredient } = state;
      const dragElement = ingredient[dragIndex];
      ingredient.splice(dragIndex, 1);
      ingredient.splice(hoverIndex, 0, dragElement);
      return {
        ...state,
        ingredient,
      };
    }

    default:
      return initialAddIngredientState;
  }
};
