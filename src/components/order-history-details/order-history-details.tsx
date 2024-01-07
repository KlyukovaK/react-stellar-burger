import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../utils/hooks";
import orderHistoryDetailsStyle from "./order-history-details.module.css";
import { getOrderDitale } from "../../utils/burger-api";
import { price, status } from "../../utils/price";
import { TIngredientData, TLocation, TOrderCard } from "../../utils/types/data";

export function OrderHistoryDetails() {
  const { number } = useParams<string>();
  const location: TLocation = useLocation();
  const [orderDetail, setOrderDetail] = useState<TOrderCard | null>(null);
  const { ingredients, ingredientRequest, ingredientFaild } = useSelector(
    (state) => state.ingredientsDataReducer,
  );
  const orderFeedReducer = useSelector((state) => state.orderFeedReducer);
  const orderProfileReducer = useSelector((state) => state.orderProfileReducer);
  const orders =
    location.pathname === `/feed/${number}`
      ? orderFeedReducer.orders?.orders
      : orderProfileReducer.orders?.orders;

  useEffect(() => {
    if (orders && number) {
      orders.forEach((item: TOrderCard) => {
        if (item.number === Number(number)) {
          setOrderDetail(item);
        }
      });
    }
    if (orders === undefined && ingredients) {
      getOrderDitale(number)
        .then((res) => {
          console.log(res);
          setOrderDetail(res.orders[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [orders, number, ingredients]);

  const count = (itemData: TIngredientData) => {
    if (orderDetail) {
      const selectIngredients = orderDetail.ingredients.filter(
        (item) => item === itemData._id,
      );
      return selectIngredients.length;
    }
    return null;
  };

  return (
    <>
      {ingredientFaild && <p>Произошла ошибка при получении данных</p>}
      {ingredientRequest && <p>Загрузка...</p>}
      {orderDetail && ingredients && (
        <main className={orderHistoryDetailsStyle.main}>
          <h1
            className={`${orderHistoryDetailsStyle.number} text text_type_digits-default`}
          >
            {`#${number}`}
          </h1>
          <h2 className="text text_type_main-medium mt-10 mb-3">
            {orderDetail.name}
          </h2>
          <p
            className={`${
              orderDetail.status === "done"
                ? `${orderHistoryDetailsStyle.status}`
                : ""
            } text text_type_main-small`}
          >
            {status(orderDetail)}
          </p>
          <h2 className="text text_type_main-medium mt-15 mb-6">Состав:</h2>
          <ul className={`${orderHistoryDetailsStyle.list} custom-scroll`}>
            {ingredients
              .filter(
                (item: TIngredientData) =>
                  orderDetail.ingredients.indexOf(item._id) !== -1,
              )
              .map((item: TIngredientData) => (
                <li
                  className={orderHistoryDetailsStyle.ingredientBlock}
                  key={item._id}
                >
                  <div className={orderHistoryDetailsStyle.ingredient}>
                    <img
                      className={orderHistoryDetailsStyle.img}
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <p
                    className={`${orderHistoryDetailsStyle.text} text text_type_main-default`}
                  >
                    {item.name}
                  </p>
                  <div className={orderHistoryDetailsStyle.count}>
                    <p className="text text_type_digits-default mr-2">
                      {count(item)} x {item.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              ))}
          </ul>
          <section className={orderHistoryDetailsStyle.allcount}>
            <FormattedDate
              className="text text_type_main-default text_color_inactive"
              date={new Date(orderDetail.updatedAt)}
            />
            <div className={orderHistoryDetailsStyle.count}>
              <p className="text text_type_digits-default mr-2">
                {price(
                  ingredients.filter(
                    (item: TIngredientData) =>
                      orderDetail.ingredients.indexOf(item._id) !== -1,
                  ),
                )}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </section>
        </main>
      )}
    </>
  );
}
