import React from "react";
import styles from "./app.module.css";
import Header from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";
import BurgerConstructor from "../burgerConstructor/burgerConctructor";

const Url = "https://norma.nomoreparties.space/api/ingredients";
function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    data: [],
  });

  React.useEffect(() => {
    setState({ ...state, isLoading: true });
    fetch(Url)
      .then((res) => res.json())
      .then((data) => setState({ ...state, data, isLoading: false }))
      .catch((err) => {
        console.log(err);
      });
  }, [setState]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerIngredients data={state} />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
