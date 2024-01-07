import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../utils/hooks";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import styles from "./app.module.css";
import { Profile } from "../../pages/profile/profile";
import { HomePage } from "../../pages/home";
import { Login } from "../../pages/login";
import { Registration } from "../../pages/registration";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";
import { Error404 } from "../../pages/page404/page404";
import Header from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { checkUserAuth } from "../../services/actions/auth";
import { getDataIngredients } from "../../services/actions/burgerIngredients";
import { OrderFeed } from "../../pages/order-feed/order-feed";
import { ProfileOrders } from "../../pages/profile-orders/profile-orders";
import { OrderHistoryDetails } from "../order-history-details/order-history-details";
import { TLocation } from "../../utils/types/data";

function App() {
  const location: TLocation = useLocation();

  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const { forgotPasswordSucces } = useSelector(
    (state) => state.formAuthReducer,
  );

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  useEffect(() => {
    dispatch(getDataIngredients());
  }, []);

  const checkResetPassword = () => {
    if (forgotPasswordSucces && location.pathname === "/reset-password") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    checkResetPassword();
  }, [checkResetPassword, forgotPasswordSucces, location.pathname]);

  const PopupInIngredientDetails = (
    <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
  );

  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        {PopupInIngredientDetails}
        <Route path="/login" element={<OnlyUnAuth element={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth element={<Registration />} />}
        />
        <Route path="/profile" element={<OnlyAuth element={<Profile />} />} />
        <Route
          path="/profile/orders"
          element={<OnlyAuth element={<ProfileOrders />} />}
        />
        <Route
          path="/profile/orders/:number"
          element={<OnlyAuth element={<OrderHistoryDetails />} />}
        />
        <Route path="/feed" element={<OrderFeed />} />
        <Route path="/feed/:number" element={<OrderHistoryDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {checkResetPassword() && (
          <Route path="/reset-password" element={<ResetPassword />} />
        )}
        <Route path="*" element={<Error404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal text="Детали игридиента" closePopup={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal text="" closePopup={handleModalClose}>
                <OrderHistoryDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <OnlyAuth
                element={
                  <Modal text="" closePopup={handleModalClose}>
                    <OrderHistoryDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
