import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../app-header/app-header";
import styles from "./app.module.css";
import { Profile } from "../../pages/profile/profile";
import { HomePage } from "../../pages/home";
import { Login } from "../../pages/login";
import { Registration } from "../../pages/registration";
import { ForgotPassword } from "../../pages/forgot-password";
import { ResetPassword } from "../../pages/reset-password";
import { Error404 } from "../../pages/page404/page404";

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
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
