import {
  ADD_INGREDIENT_DETAIL,
  CLOSE_INGREDIENT_DETAIL,
} from "../actions/ingredientPopup";

const initialIngredientDetailState = {
  ingradientDetail: null,
};

export const initialIngredientDetailReducer = (
  state = initialIngredientDetailState,
  action = {},
) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAIL: {
      return {
        ...state,
        ingradientDetail: action.payload,
      };
    }
    case CLOSE_INGREDIENT_DETAIL: {
      return {
        ...state,
        ingradientDetail: null,
      };
    }
    default: {
      return state;
    }
  }
};
