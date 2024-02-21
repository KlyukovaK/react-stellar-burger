import { TIngredientData } from "../../utils/types/data";
import { TAddIngredientDetailAction } from "../actions/ingredientPopup";
import {
  ADD_INGREDIENT_DETAIL,
  CLOSE_INGREDIENT_DETAIL,
} from "../constants/ingredientPopup";

type TInitialIngredientDetailState = {
  ingradientDetail: null | TIngredientData;
};

const initialIngredientDetailState: TInitialIngredientDetailState = {
  ingradientDetail: null,
};

export const initialIngredientDetailReducer = (
  state = initialIngredientDetailState,
  action: TAddIngredientDetailAction,
): TInitialIngredientDetailState => {
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
