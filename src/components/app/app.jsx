import styles from "./app.module.css";
import { data } from "../../utils/data";
import Header from '../appHeader/appHeader';
import BurgerIngredients from '../burgerIngredients/burgerIngredients';
function App() {
  return (
    <div className={styles.app}>
      	<Header/>
        <main className={styles.main}>
          <BurgerIngredients/>
          <div style={{width:600}}>hgwerjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjhjh</div>
        </main>
    </div>
  );
}

export default App;
