import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { HistoryOfOrders } from "../../components/history-of-orders/history-of-orders";
import orderFeedStyle from "./order-feed.module.css";
import { connect, disconnect } from "../../services/actions/orderFeed";

export function OrderFeed() {
  const ORDER_FEED = "wss://norma.nomoreparties.space/orders/all";
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orderFeedReducer);
  useEffect(() => {
    dispatch(connect(ORDER_FEED));
    return () => {
      dispatch(disconnect());
    };
  }, []);

  return (
    <>
      {orders.length === 0 && (
        <h1 className="text text_type_main-medium m-30">Загрузка...</h1>
      )}
      {orders.length !== 0 && (
        <main className={orderFeedStyle.main}>
          <HistoryOfOrders text="Лента заказов" orders={orders} />
          <section className={orderFeedStyle.section}>
            <h2 className="text text_type_main-medium mb-4">Готовы:</h2>
            <ul className={orderFeedStyle.list}>
              {orders.orders.map(
                (item) =>
                  item.status === "done" && (
                    <li
                      key={item._id}
                      className={`${orderFeedStyle.number} ${orderFeedStyle.numberDone} text text_type_digits-default`}
                    >
                      {item.number}
                    </li>
                  ),
              )}
            </ul>
            <h2 className="text text_type_main-medium mb-4">В работе:</h2>
            <ul className={orderFeedStyle.list}>
              {orders.orders.map(
                (item) =>
                  item.status === "pending" && (
                    <li
                      key={item._id}
                      className={`${orderFeedStyle.number} text text_type_digits-default`}
                    >
                      {item.number}
                    </li>
                  ),
              )}
            </ul>
          </section>
          <div className={orderFeedStyle.container}>
            <h2 className="text text_type_main-medium">
              Выполнено за все время:
            </h2>
            <p
              className={`${orderFeedStyle.completed} text text_type_digits-large mb-15`}
            >
              {orders.total}
            </p>
            <h2 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h2>
            <p
              className={`${orderFeedStyle.completed} text text_type_digits-large`}
            >
              {orders.totalToday}
            </p>
          </div>
        </main>
      )}
    </>
  );
}
