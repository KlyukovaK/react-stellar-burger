import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import Header from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-conctructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { getDataIngredients } from "../../services/actions/burgerIngredients";
import { CLOSE_ORDER } from "../../services/actions/orderDetails";
import { CLOSE_INGREDIENT_DETAIL } from "../../services/actions/ingredientPopup";

function App() {
  // подгрузка с api
  const { ingredients, ingredientRequest, ingredientFaild } = useSelector(
    (state) => state.ingredientsDataReducer,
  );
  const { order, orderRequest, orderFaild } = useSelector(
    (state) => state.orderReducer,
  );
  const { ingradientDetail } = useSelector(
    (state) => state.initialIngredientDetailReducer,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getDataIngredients());
  }, []);
  // close popup
  const closePopup = () => {
    if (order) {
      dispatch({ type: CLOSE_ORDER });
    } else {
      dispatch({ type: CLOSE_INGREDIENT_DETAIL });
    }
  };

  return (
    <div className={styles.app}>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          {ingredientFaild && <p>Произошла ошибка при получении данных</p>}
          {ingredientRequest && <p>Загрузка...</p>}
          {ingredients && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </main>
      </DndProvider>
      {orderFaild && <p>Произошла ошибка при получении данных</p>}
      {orderRequest && <p>Загрузка...</p>}
      {order && (
        <Modal text=" " closePopup={closePopup}>
          <OrderDetails />
        </Modal>
      )}
      {ingradientDetail && (
        <Modal text="Детали игридиента" closePopup={closePopup}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
