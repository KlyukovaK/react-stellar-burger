import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../app-header/app-header";
import styles from "./app.module.css";
import { Profile } from "../../pages/profile/profile";
import { HomePage } from "../../pages/home/home";
import { Login } from "../../pages/login/login";
import { Registration } from "../../pages/registration/registration";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
