import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "../utils/hooks";
import styles from "../components/app/app.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-conctructor";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { CLOSE_ORDER } from "../services/constants/orderDetails";
import { CLOSE_INGREDIENT_DETAIL } from "../services/constants/ingredientPopup";
import { Loader } from "../components/loader/loader";

export function HomePage() {
  // подгрузка с api
  const { ingredients, ingredientRequest, ingredientFaild } = useSelector(
    (state) => state.ingredientsDataReducer,
  );
  const { order, orderRequest, orderFaild } = useSelector(
    (state) => state.orderReducer,
  );

  const dispatch = useDispatch();
  // close popup
  const closePopup = (): void => {
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
          {ingredientRequest && <Loader text="Загрузка" />}
          {ingredients && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </main>
      </DndProvider>
      {orderFaild && (
        <Modal text=" " closePopup={closePopup}>
          <p>Произошла ошибка при получении данных</p>
        </Modal>
      )}
      {orderRequest && (
        <Modal text=" " closePopup={closePopup}>
          <Loader text="Заказ отправляется" />
        </Modal>
      )}
      {order && (
        <Modal text=" " closePopup={closePopup}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
