import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer";
import { socketMiddleware } from "./middlewere/socket-middleware";
import type {} from "redux-thunk/extend-redux";

import {
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_OPEN,
} from "./constants/orderFeed";
import {
  ORDER_PROFILE_CONNECT,
  ORDER_PROFILE_DISCONNECT,
  ORDER_PROFILE_WS_CLOSE,
  ORDER_PROFILE_WS_CONNECTING,
  ORDER_PROFILE_WS_ERROR,
  ORDER_PROFILE_WS_MESSAGE,
  ORDER_PROFILE_WS_OPEN,
} from "./constants/profileOrder";
import { TAuthAction } from "./actions/auth";
import { TAddIngredient } from "./actions/burgerConstructor";
import { TGetDataIngredientsAction } from "./actions/burgerIngredients";
import { TAddIngredientDetailAction } from "./actions/ingredientPopup";
import { TGetOrderAction } from "./actions/orderDetails";
import { TOrderFeedAction } from "./actions/orderFeed";
import { TOrderProfileAction } from "./actions/profileOrder";

const orderFeedMiddleware = socketMiddleware({
  wsConnect: ORDER_FEED_CONNECT,
  onOpen: ORDER_FEED_WS_OPEN,
  onClose: ORDER_FEED_WS_CLOSE,
  onError: ORDER_FEED_WS_ERROR,
  onMessage: ORDER_FEED_WS_MESSAGE,
  wsConnecting: ORDER_FEED_WS_CONNECTING,
  wsDisconnect: ORDER_FEED_DISCONNECT,
});

const orderProfileMiddleware = socketMiddleware({
  wsConnect: ORDER_PROFILE_CONNECT,
  onOpen: ORDER_PROFILE_WS_OPEN,
  onClose: ORDER_PROFILE_WS_CLOSE,
  onError: ORDER_PROFILE_WS_ERROR,
  onMessage: ORDER_PROFILE_WS_MESSAGE,
  wsConnecting: ORDER_PROFILE_WS_CONNECTING,
  wsDisconnect: ORDER_PROFILE_DISCONNECT,
});

export type TRootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      orderFeedMiddleware,
      orderProfileMiddleware,
    );
  },
});

type TAppActions =
  | TAuthAction
  | TAddIngredient
  | TGetDataIngredientsAction
  | TAddIngredientDetailAction
  | TGetOrderAction
  | TOrderFeedAction
  | TOrderProfileAction;

export type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TRootState,
  unknown,
  TAppActions
>;
export type TAppDispatch<TReturnType = void> = (
  action: TAppActions | TAppThunk<TReturnType>,
) => TReturnType;
