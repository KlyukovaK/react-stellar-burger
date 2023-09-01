import { getOrderApi } from "../../utils/burger-api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const CLOSE_ORDER = " CLOSE_ORDER";

const UrlOrder = "https://norma.nomoreparties.space/api/orders";

export const getOrder = (getIdIngredient) => {
  return (dispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderApi(UrlOrder, getIdIngredient)
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
