import { TIngredientData } from "../../utils/types/data";
import {
  ADD_INGREDIENT_DETAIL,
  CLOSE_INGREDIENT_DETAIL,
} from "../constants/ingredientPopup";

export interface IAddIngredientDetailAction {
  readonly type: typeof ADD_INGREDIENT_DETAIL;
  payload: TIngredientData;
}
export interface ICloseIngredientDetailAction {
  readonly type: typeof CLOSE_INGREDIENT_DETAIL;
}
export type TAddIngredientDetailAction =
  | IAddIngredientDetailAction
  | ICloseIngredientDetailAction;

export const addIngredientDetail = (itemData: TIngredientData) => {
  return {
    type: ADD_INGREDIENT_DETAIL,
    payload: itemData,
  };
};
