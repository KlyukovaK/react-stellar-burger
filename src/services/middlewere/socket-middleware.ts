import { Middleware, MiddlewareAPI } from "redux";
import {
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_OPEN,
} from "../constants/orderFeed";
import {
  ORDER_PROFILE_CONNECT,
  ORDER_PROFILE_DISCONNECT,
  ORDER_PROFILE_WS_CLOSE,
  ORDER_PROFILE_WS_CONNECTING,
  ORDER_PROFILE_WS_ERROR,
  ORDER_PROFILE_WS_MESSAGE,
  ORDER_PROFILE_WS_OPEN,
} from "../constants/profileOrder";

type TWsActions = {
  wsConnect: string | typeof ORDER_FEED_CONNECT | typeof ORDER_PROFILE_CONNECT;
  wsSendMessage?: string;
  onOpen: string | typeof ORDER_FEED_WS_OPEN | typeof ORDER_PROFILE_WS_OPEN;
  onClose: string | typeof ORDER_FEED_WS_CLOSE | typeof ORDER_PROFILE_WS_CLOSE;
  onError: string | typeof ORDER_FEED_WS_ERROR | typeof ORDER_PROFILE_WS_ERROR;
  onMessage:
    | string
    | typeof ORDER_FEED_WS_MESSAGE
    | typeof ORDER_PROFILE_WS_MESSAGE;
  wsConnecting:
    | string
    | typeof ORDER_FEED_WS_CONNECTING
    | typeof ORDER_PROFILE_WS_CONNECTING;
  wsDisconnect:
    | string
    | typeof ORDER_FEED_DISCONNECT
    | typeof ORDER_PROFILE_DISCONNECT;
};
export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError, payload: "Error" });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        if (wsSendMessage && type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload));
        }

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
