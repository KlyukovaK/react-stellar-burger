import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../app-header/app-header";
import styles from "./app.module.css";
import { Profile } from "../../pages/profile/profile";
import { HomePage } from "../../pages/home";
import { Login } from "../../pages/login";
import { Registration } from "../../pages/registration";
import { ForgotPassword } from "../../pages/forgot-password";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
