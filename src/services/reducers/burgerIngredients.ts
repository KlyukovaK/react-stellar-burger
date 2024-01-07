import { TIngredientData } from "../../utils/types/data";
import { TGetDataIngredientsAction } from "../actions/burgerIngredients";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
} from "../constants/burgerIngredients";

type TInitialDataState = {
  ingredients: null | Array<TIngredientData>;
  ingredientRequest: boolean;
  ingredientFaild: boolean;
};

const initialDataState: TInitialDataState = {
  ingredientRequest: false,
  ingredientFaild: false,
  ingredients: null,
};

export const ingredientsDataReducer = (
  state = initialDataState,
  action: TGetDataIngredientsAction,
): TInitialDataState => {
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
    default: {
      return state;
    }
  }
};
