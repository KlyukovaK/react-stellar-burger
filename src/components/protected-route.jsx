import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Loader } from "./loader/loader";

function ProtectedRouteElement({ onlyUnAuth = false, element }) {
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
const OnlyUnAuth = function ({ element }) {
  return <ProtectedRouteElement onlyUnAuth element={element} />;
};

ProtectedRouteElement.propTypes = {
  onlyUnAuth: PropTypes.bool,
  element: PropTypes.element.isRequired,
};

OnlyUnAuth.propTypes = {
  element: PropTypes.element.isRequired,
};

export { OnlyAuth, OnlyUnAuth };
