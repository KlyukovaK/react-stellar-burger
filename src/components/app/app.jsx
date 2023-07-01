import styles from "./app.module.css";
import Header from "../appHeader/appHeader";
import BurgerIngredients from "../burgerIngredients/burgerIngredients";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <BurgerIngredients />
        <div style={{ width: 600 }}>
          hgwerjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhllljlkjljljllkkkkkkkk;lk;l;kl;k;k;
        </div>
      </main>
    </div>
  );
}

export default App;
