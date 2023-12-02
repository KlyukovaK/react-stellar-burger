import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { HistoryOfOrders } from "../../components/history-of-orders/history-of-orders";
import { ProfileMenu } from "../../components/profile-menu/profile-menu";
import profileOrdersStyle from "./profile-orders.module.css";
import { connect } from "../../services/actions/profileOrder";
import { WebsocketStatus } from "../../utils/websocketStatus";

export function ProfileOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ORDER_PROFILE = "wss://norma.nomoreparties.space/orders";
  const { status, orders } = useSelector((state) => state.orderProfileReducer);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const accessTokenSplit = accessToken.split("Bearer ")[1];
    dispatch(connect(`${ORDER_PROFILE}?token=${accessTokenSplit}`));
  }, [accessToken]);

  return (
    <>
      {status === WebsocketStatus.OFFLINE && (
        <p>Произошла ошибка при получении данных</p>
      )}
      {status === WebsocketStatus.OFFLINE && <p>Загрузка...</p>}
      {status === WebsocketStatus.ONLINE && (
        <main className={profileOrdersStyle.main}>
          <ProfileMenu />
          {orders.length === 0 ? (
            <>
              <h1 className="text text_type_main-medium m-30">Заказов нет</h1>
              <Button
                onClick={() => navigate("/")}
                htmlType="button"
                type="primary"
                size="medium"
              >
                На главную
              </Button>
            </>
          ) : (
            <HistoryOfOrders text="" orders={orders} />
          )}
        </main>
      )}
    </>
  );
}
