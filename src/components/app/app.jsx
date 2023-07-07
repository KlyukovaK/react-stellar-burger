import React from "react";
import styles from "./app.module.css";
import Header from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConctructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredientDetails/ingredientDetails";
import OrderDetails from "../orderDetails/orderDetails";

const Url = "https://norma.nomoreparties.space/api/ingredients";
function App() {
  // подгрузка с api
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(Url)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // открытие popup
  const [orderId, setOrderId] = React.useState();
  const [ingredientModal, setIngredientModal] = React.useState();

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerIngredients
          data={data}
          setIngredientModal={setIngredientModal}
        />
        <BurgerConstructor data={data} setOrderId={setOrderId} />
      </main>

      {orderId && (
        <Modal text=" " setOrderId={setOrderId} cleanModal={setOrderId}>
          <OrderDetails />
        </Modal>
      )}

      {ingredientModal && (
        <Modal text="Детали " cleanModal={setIngredientModal}>
          <IngredientDetails ingredient={ingredientModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
