import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function App() {
  const location = useLocation();
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
  const checkResetPassword = () => {
    if (forgotPasswordSucces && location.pathname === "/reset-password") {
      return true;
    }
    return false;
  };
  useEffect(() => {
    checkResetPassword();
  }, [checkResetPassword, forgotPasswordSucces, location.pathname]);

  return (
    <div className={styles.app}>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/ingredients/:ingredientId"
          element={<IngredientDetails />}
        />
        <Route path="/login" element={<OnlyUnAuth element={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth element={<Registration />} />}
        />
        <Route path="/profile" element={<OnlyAuth element={<Profile />} />} />
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
        </Routes>
      )}
    </div>
  );
}

export default App;
