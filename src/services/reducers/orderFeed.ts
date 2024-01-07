import { THistoryOfOrgers } from "../../utils/types/data";
import { WebsocketStatus } from "../../utils/websocketStatus";
import { TOrderFeedAction } from "../actions/orderFeed";
import {
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_OPEN,
} from "../constants/orderFeed";

export type TInitiaOrderFeedState = {
  status: keyof typeof WebsocketStatus | string;
  orders: THistoryOfOrgers | null;
  connectingError: string | null;
};
const initiaOrderFeedState: TInitiaOrderFeedState = {
  status: WebsocketStatus.OFFLINE,
  orders: null,
  connectingError: null,
};

export const orderFeedReducer = (
  state = initiaOrderFeedState,
  action: TOrderFeedAction,
): TInitiaOrderFeedState => {
  switch (action.type) {
    case ORDER_FEED_WS_CONNECTING:
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case ORDER_FEED_WS_OPEN:
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: "",
      };
    case ORDER_FEED_WS_CLOSE:
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    case ORDER_FEED_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case ORDER_FEED_WS_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
