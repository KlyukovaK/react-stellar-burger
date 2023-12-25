import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/rootReducer";
import { socketMiddleware } from "./middlewere/socket-middleware";

import {
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_OPEN,
} from "./actions/orderFeed";
import {
  ORDER_PROFILE_CONNECT,
  ORDER_PROFILE_DISCONNECT,
  ORDER_PROFILE_WS_CLOSE,
  ORDER_PROFILE_WS_CONNECTING,
  ORDER_PROFILE_WS_ERROR,
  ORDER_PROFILE_WS_MESSAGE,
  ORDER_PROFILE_WS_OPEN,
} from "./actions/profileOrder";

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

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      orderFeedMiddleware,
      orderProfileMiddleware,
    );
  },
});
