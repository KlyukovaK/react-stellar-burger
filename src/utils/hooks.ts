import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { TAppDispatch, TRootState } from "../services/store";

// Хук не даст отправить экшен, который ему не знаком
export const useDispatch: () => TAppDispatch = dispatchHook;
// Теперь этот хук знает структуру хранилища
export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
