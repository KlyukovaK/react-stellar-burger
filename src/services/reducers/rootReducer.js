import { combineReducers } from "redux";
import { ingredientsDataReducer } from "./burgerIngredients";
import { ingredientsReducer } from "./burgerConstructor";
import { orderReducer } from "./orderDetails";
import { initialIngredientDetailReducer } from "./ingredientPopup";

export const rootReducer = combineReducers({
  ingredientsDataReducer,
  ingredientsReducer,
  orderReducer,
  initialIngredientDetailReducer,
});
