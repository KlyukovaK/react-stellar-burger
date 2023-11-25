import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "../components/app/app.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-conctructor";
import Modal from "../components/modal/modal";
// import IngredientDetails from "../components/ingredient-details/ingredient-details";
import OrderDetails from "../components/order-details/order-details";
import { getDataIngredients } from "../services/actions/burgerIngredients";
import { CLOSE_ORDER } from "../services/actions/orderDetails";
import { CLOSE_INGREDIENT_DETAIL } from "../services/actions/ingredientPopup";

export function HomePage() {
  // подгрузка с api
  const { ingredients, ingredientRequest, ingredientFaild } = useSelector(
    (state) => state.ingredientsDataReducer,
  );
  const { order, orderRequest, orderFaild } = useSelector(
    (state) => state.orderReducer,
  );
  // const { ingradientDetail } = useSelector(
  //   (state) => state.initialIngredientDetailReducer,
  // );
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
    <>
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
      {/* {ingradientDetail && (
        <Modal text="Детали игридиента" closePopup={closePopup}>
          <IngredientDetails />
        </Modal>
      )} */}
    </>
  );
}
