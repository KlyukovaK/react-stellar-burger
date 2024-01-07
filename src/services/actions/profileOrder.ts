import { THistoryOfOrgers } from "../../utils/types/data";
import {
  ORDER_PROFILE_CONNECT,
  ORDER_PROFILE_DISCONNECT,
  ORDER_PROFILE_WS_CLOSE,
  ORDER_PROFILE_WS_CONNECTING,
  ORDER_PROFILE_WS_ERROR,
  ORDER_PROFILE_WS_MESSAGE,
  ORDER_PROFILE_WS_OPEN,
} from "../constants/profileOrder";

export interface IOrderProfileConnectAction {
  readonly type: typeof ORDER_PROFILE_CONNECT;
  payload: string;
}
export interface IOrderProfileDisconnectAction {
  readonly type: typeof ORDER_PROFILE_DISCONNECT;
}
export interface IOrderProfileWSConnectingAction {
  readonly type: typeof ORDER_PROFILE_WS_CONNECTING;
}
export interface IOrderProfileWSOpenAction {
  readonly type: typeof ORDER_PROFILE_WS_OPEN;
  payload: string;
}
export interface IOrderProfileWSCloseAction {
  readonly type: typeof ORDER_PROFILE_WS_CLOSE;
}
export interface IOrderProfileWSMessageAction {
  readonly type: typeof ORDER_PROFILE_WS_MESSAGE;
  payload: THistoryOfOrgers | null;
}
export interface IOrderProfileWSErrorAction {
  readonly type: typeof ORDER_PROFILE_WS_ERROR;
  payload: string;
}
export type TOrderProfileAction =
  | IOrderProfileConnectAction
  | IOrderProfileDisconnectAction
  | IOrderProfileWSConnectingAction
  | IOrderProfileWSOpenAction
  | IOrderProfileWSCloseAction
  | IOrderProfileWSMessageAction
  | IOrderProfileWSErrorAction;
export const connect = (url: string): IOrderProfileConnectAction => ({
  type: ORDER_PROFILE_CONNECT,
  payload: url,
});

export const disconnect = (): IOrderProfileDisconnectAction => ({
  type: ORDER_PROFILE_DISCONNECT,
});
