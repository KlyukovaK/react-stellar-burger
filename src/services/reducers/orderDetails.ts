import { TGetOrderAction } from "../actions/orderDetails";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER,
} from "../constants/orderDetails";
type TInitialOrderState = {
  orderRequest: boolean;
  orderFaild: boolean;
  orderSuccess: boolean;
  order: null | number | string;
};
const initialOrderState: TInitialOrderState = {
  orderRequest: false,
  orderFaild: false,
  orderSuccess: false,
  order: null,
};

export const orderReducer = (
  state = initialOrderState,
  action: TGetOrderAction,
): TInitialOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFaild: false,
        orderSuccess: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: true,
        order: action.payload,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFaild: true,
        orderSuccess: false,
      };
    }
    case CLOSE_ORDER: {
      return {
        ...state,
        orderSuccess: false,
        order: null,
      };
    }
    default: {
      return state;
    }
  }
};
