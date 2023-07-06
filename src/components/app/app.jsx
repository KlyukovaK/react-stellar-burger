import React from "react";
import styles from "./app.module.css";
import Header from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConctructor";

const Url = "https://norma.nomoreparties.space/api/ingredients";
function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(Url)
      .then((res) => res.json())
      .then((res) => setData(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
