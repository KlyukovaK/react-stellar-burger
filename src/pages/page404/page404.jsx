import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import page404Styles from "./page404.module.css";

export function Error404() {
  const navigate = useNavigate();
  return (
    <main className={page404Styles.main}>
      <h1 className="text text_type_digits-large">404</h1>
      <h2 className="text text_type_main-medium">Страница не найдена</h2>
      <Button
        htmlType="button"
        type="secondary"
        size="large"
        onClick={() => {
          navigate("/");
        }}
      >
        Вернуться на гравную страницу
      </Button>
    </main>
  );
}
