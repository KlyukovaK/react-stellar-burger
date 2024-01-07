import { getOrderApi } from "../../utils/burger-api";
import {
  CLOSE_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "../constants/orderDetails";
import { TAppThunk } from "../store";

export interface IGetOrgerRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrgerSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: number | string;
}
export interface IGetOrgerFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface ICloseOrderAction {
  readonly type: typeof CLOSE_ORDER;
}
export type TGetOrderAction =
  | IGetOrgerRequestAction
  | IGetOrgerSuccessAction
  | IGetOrgerFailedAction
  | ICloseOrderAction;

export const getOrder = (getIdIngredient: string[]): TAppThunk => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderApi(getIdIngredient)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res.order.number,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};
