import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../app-header/app-header";
import styles from "./app.module.css";
// import { HomePage } from "../../pages/home";
import { Profile } from "../../pages/profile/profile";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
