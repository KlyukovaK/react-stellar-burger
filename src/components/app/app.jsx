import styles from "./app.module.css";
import { data } from "../../utils/data";
import Header from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
function App() {
  return (
    <div className={styles.app}>
      	<Header/>
        <main>
          <BurgerIngredients/>
        </main>
    </div>
  );
}

export default App;
