import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  INCREASE_INGREDIENTS,
  DECREASE_INGREDIENTS,
} from "../actions/burgerIngredients";

const initialDataState = {
  ingredientRequest: false,
  ingredientFaild: false,
  ingredients: null,
  value: 0,
};

export const ingredientsDataReducer = (
  state = initialDataState,
  action = {},
) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientRequest: true,
        ingredientFaild: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientRequest: false,
        ingredients: action.payload,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientRequest: false,
        ingredientFaild: true,
      };
    }
    case INCREASE_INGREDIENTS: {
      return {
        ...state,
        value: state.value + 1,
      };
    }
    case DECREASE_INGREDIENTS: {
      return {
        ...state,
        value: state.value - 1,
      };
    }
    default: {
      return state;
    }
  }
};
