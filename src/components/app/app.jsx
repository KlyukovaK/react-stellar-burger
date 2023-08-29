import React from "react";
import styles from "./app.module.css";
import Header from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConctructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import OrderDetails from "../orderDetails/orderDetails";
import { getIngredients, getOrderApi } from "../../utils/burger-api";
import AppContext from "../../services/AppContext";

const UrlData = "https://norma.nomoreparties.space/api/ingredients";
const UrlOrder = "https://norma.nomoreparties.space/api/orders";
function App() {
  // подгрузка с api
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getIngredients(UrlData)
      .then((res) => setData(res.data))
      .catch((err) => {
        setData(err);
        console.log(err);
      });
  }, []);
  // открытие popup
  const [orderId, setOrderId] = React.useState(null);
  // const [ingredientModal, setIngredientModal] = React.useState(null);
  // добавление в заказ
  const initialAddIngredientState = { data: null, ingredient: [] };
  function reducer(state, action) {
    switch (action.type) {
      case "set":
        return {
          ...state,
          data: action.payload,
          ingredient: [...state.ingredient, action.payload],
        };
      case "reset":
        return {
          ...state,
          data: null,
        };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [addIngredientState, addIngredientDispatcher] = React.useReducer(
    reducer,
    initialAddIngredientState,
    undefined,
  );

  const getIdIngredient = addIngredientState.ingredient.map((item) => item._id);
  const [orderNumber, orderNumberState] = React.useState(0);

  const getOrder = () => {
    getOrderApi(UrlOrder, getIdIngredient)
      .then((res) => orderNumberState(res.order.number))
      .catch((err) => {
        orderNumberState(err);
        console.log(err);
      });
  };

  const storeData = React.useMemo(
    () => ({
      data,
      setOrderId,
      getOrder,
      addIngredientState,
      orderNumber,
      addIngredientDispatcher,
    }),
    [
      data,
      getOrder,
      orderNumber,
      setOrderId,
      addIngredientState,
      addIngredientDispatcher,
    ],
  );

  return (
    <AppContext.Provider value={storeData}>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>

        {orderId && (
          <Modal text=" ">
            <OrderDetails />
          </Modal>
        )}

        {addIngredientState.data !== null && (
          <Modal text="Детали игридиента">
            <IngredientDetails />
          </Modal>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
