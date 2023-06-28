import styles from "./app.module.css";
import { data } from "../../utils/data";
import Header from '../appHeader/appHeader';
function App() {
  return (
    <div className={styles.app}>
      	<Header/>
    </div>
  );
}

export default App;
