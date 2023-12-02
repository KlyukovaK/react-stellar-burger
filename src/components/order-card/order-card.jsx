import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import orderCardStyle from "./order-card.module.css";
import { price } from "../burger-constructor/burger-conctructor";

export function OrderCard({ itemOrder }) {
  const numberId = itemOrder.number;
  const location = useLocation();
  const { ingredients } = useSelector((state) => state.ingredientsDataReducer);
  const uniqulIngredientId = ingredients.filter(
    (item) => itemOrder.ingredients.indexOf(item._id) !== -1,
  );

  const getUniqulIngredient = () => {
    return uniqulIngredientId.filter(
      (el, index) => index === uniqulIngredientId.indexOf(el),
    );
  };
  const totalPrice = price(uniqulIngredientId);
  const status = (order) => {
    if (order.status === "done") {
      return "Выполнен";
    }
    if (order.status === "pending") {
      return "Готовиться";
    }
    return "Создан";
  };

  return (
    <Link
      to={`${
        location.pathname === "/feed"
          ? `/feed/${numberId}`
          : `/profile/orders/${numberId}`
      }`}
      state={{ background: location }}
      className={`${orderCardStyle.list} ${
        location.pathname === "/feed" ? "mb-4" : "mb-6"
      }`}
    >
      <div className={orderCardStyle.box}>
        <p className="text text_type_digits-default">{`#${itemOrder.number}`}</p>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(itemOrder.updatedAt)}
        />
      </div>
      <h2 className="text text_type_main-medium mt-4">{itemOrder.name}</h2>
      {location.pathname === "/profile/orders" ? (
        <p
          className={`${
            status(itemOrder) === "Выполнен" ? `${orderCardStyle.done}` : ""
          } text text_type_main-small mt-2`}
        >
          {status(itemOrder)}
        </p>
      ) : null}
      <div className={`${orderCardStyle.box} mt-6`}>
        <ul className={orderCardStyle.ingredients}>
          {getUniqulIngredient()
            .slice(0, 6)
            .map((item, index) => (
              <li className={orderCardStyle.ingredient} key={item._id}>
                {index === 5 && (
                  <p
                    className={`${orderCardStyle.number} text text_type_digits-default`}
                  >
                    {`+${getUniqulIngredient().length - 5}`}
                  </p>
                )}
                <img
                  className={orderCardStyle.img}
                  src={item.image}
                  alt={item.name}
                />
              </li>
            ))}
        </ul>
        <div className={`${orderCardStyle.count}`}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  itemOrder: PropTypes.oneOfType([PropTypes.object]),
};
