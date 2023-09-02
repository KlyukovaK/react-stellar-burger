import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./app.module.css";
import Header from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConctructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import OrderDetails from "../orderDetails/orderDetails";
import { getDataIngredients } from "../../services/actions/burgerIngredients";

function App() {
  // подгрузка с api
  const { ingredients, ingredientRequest, ingredientFaild } = useSelector(
    (state) => state.ingredientsDataReducer,
  );
  const { order } = useSelector((state) => state.orderReducer);
  const { ingradientDetail } = useSelector(
    (state) => state.initialIngredientDetailReducer,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getDataIngredients());
  }, []);

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
      {order && (
        <Modal text=" ">
          <OrderDetails />
        </Modal>
      )}
      {ingradientDetail && (
        <Modal text="Детали игридиента">
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
