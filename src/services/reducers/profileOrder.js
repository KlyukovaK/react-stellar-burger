import { WebsocketStatus } from "../../utils/websocketStatus";
import {
  ORDER_PROFILE_WS_CLOSE,
  ORDER_PROFILE_WS_CONNECTING,
  ORDER_PROFILE_WS_ERROR,
  ORDER_PROFILE_WS_MESSAGE,
  ORDER_PROFILE_WS_OPEN,
} from "../actions/profileOrder";

const initiaOrderProfileState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: null,
};

export const orderProfileReducer = (
  state = initiaOrderProfileState,
  action = {},
) => {
  switch (action.type) {
    case ORDER_PROFILE_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case ORDER_PROFILE_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: "",
      };
    case ORDER_PROFILE_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case ORDER_PROFILE_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case ORDER_PROFILE_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
