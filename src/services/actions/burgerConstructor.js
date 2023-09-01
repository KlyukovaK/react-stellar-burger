import { v4 as uuidv4 } from "uuid";

export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const DELETE_INGREDIENTS = "DELETE_INGREDIENTS";

export const addIngridient = (itemData) => {
  return {
    type: ADD_INGREDIENTS,
    payload: {
      ...itemData,
      key: uuidv4(),
    },
  };
};
