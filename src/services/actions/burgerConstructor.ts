import { v4 as uuidv4 } from "uuid";
import { TIngredientData } from "../../utils/types/data";
import {
  ADD_INGREDIENTS,
  CHANGE_BUN,
  CLEAN_INGREDIENTS,
  DELETE_INGREDIENTS,
  MOVE_ELEMENT,
} from "../constants/burgerConstructor";

export interface IAddIngredientsAction {
  readonly type: typeof ADD_INGREDIENTS;
  payload: TIngredientData & { key: string };
}
export interface IDeleteIngredientsAction {
  readonly type: typeof DELETE_INGREDIENTS;
  payload: string | number | undefined;
}
export interface IChangeBunAction {
  readonly type: typeof CHANGE_BUN;
  payload: TIngredientData;
}
export interface IMoveElementAction {
  readonly type: typeof MOVE_ELEMENT;
  payload: { ingredient?: TIngredientData } & {
    dragIndex: number;
    hoverIndex: number;
  };
}
export interface ICleanIngredientsAction {
  readonly type: typeof CLEAN_INGREDIENTS;
}
export type TAddIngredient =
  | IAddIngredientsAction
  | IDeleteIngredientsAction
  | IChangeBunAction
  | IMoveElementAction
  | ICleanIngredientsAction;

export const addIngredient = (
  itemData: TIngredientData,
): IAddIngredientsAction => {
  return {
    type: ADD_INGREDIENTS,
    payload: {
      ...itemData,
      key: uuidv4(),
    },
  };
};
