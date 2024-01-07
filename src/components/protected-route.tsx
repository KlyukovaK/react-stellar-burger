import { useSelector } from "../utils/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "./loader/loader";

type TProtectedRouteElement = {
  onlyUnAuth?: boolean;
  element: JSX.Element;
};

function ProtectedRouteElement({
  onlyUnAuth = false,
  element,
}: TProtectedRouteElement) {
  const { isAuthChecked, user } = useSelector((store) => store.formAuthReducer); // флаг проверки токена и user
  const location = useLocation();
  if (!isAuthChecked) {
    return <Loader text="Загрузка" />;
  }
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return element;
}

const OnlyAuth = ProtectedRouteElement;
const OnlyUnAuth = function ({ element }: { element: JSX.Element }) {
  return <ProtectedRouteElement onlyUnAuth element={element} />;
};

export { OnlyAuth, OnlyUnAuth };
