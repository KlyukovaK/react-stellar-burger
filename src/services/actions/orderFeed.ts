import { THistoryOfOrgers } from "../../utils/types/data";
import {
  ORDER_FEED_CONNECT,
  ORDER_FEED_DISCONNECT,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_ERROR,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_OPEN,
} from "../constants/orderFeed";

export interface IOrderFeedConnectAction {
  readonly type: typeof ORDER_FEED_CONNECT;
  payload: string;
}
export interface IOrderFeedDisconnectAction {
  readonly type: typeof ORDER_FEED_DISCONNECT;
}
export interface IOrderFeedWSConnectingAction {
  readonly type: typeof ORDER_FEED_WS_CONNECTING;
}
export interface IOrderFeedWSOpenAction {
  readonly type: typeof ORDER_FEED_WS_OPEN;
  payload: string;
}
export interface IOrderFeedWSCloseAction {
  readonly type: typeof ORDER_FEED_WS_CLOSE;
}
export interface IOrderFeedWSMessageAction {
  readonly type: typeof ORDER_FEED_WS_MESSAGE;
  payload: THistoryOfOrgers | null;
}
export interface IOrderFeedWSErrorAction {
  readonly type: typeof ORDER_FEED_WS_ERROR;
  payload: string;
}
export type TOrderFeedAction =
  | IOrderFeedConnectAction
  | IOrderFeedDisconnectAction
  | IOrderFeedWSConnectingAction
  | IOrderFeedWSOpenAction
  | IOrderFeedWSCloseAction
  | IOrderFeedWSMessageAction
  | IOrderFeedWSErrorAction;

export const connect = (url: string): IOrderFeedConnectAction => ({
  type: ORDER_FEED_CONNECT,
  payload: url,
});

export const disconnect = (): IOrderFeedDisconnectAction => ({
  type: ORDER_FEED_DISCONNECT,
});
