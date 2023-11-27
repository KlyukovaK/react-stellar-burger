import { combineReducers } from "redux";
import { ingredientsDataReducer } from "./burgerIngredients";
import { ingredientsReducer } from "./burgerConstructor";
import { orderReducer } from "./orderDetails";
import { initialIngredientDetailReducer } from "./ingredientPopup";
import { formAuthReducer } from "./auth";

export const rootReducer = combineReducers({
  ingredientsDataReducer,
  ingredientsReducer,
  orderReducer,
  initialIngredientDetailReducer,
  formAuthReducer,
});
