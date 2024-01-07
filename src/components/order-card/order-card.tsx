import { Link, useLocation } from "react-router-dom";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../utils/hooks";
import orderCardStyle from "./order-card.module.css";
import { price, status } from "../../utils/price";
import { TOrderCard, TIngredientData } from "../../utils/types/data";

export function OrderCard({ itemOrder }: { itemOrder: TOrderCard }) {
  const numberId = itemOrder.number;
  const location = useLocation();
  const { ingredients } = useSelector((state) => state.ingredientsDataReducer);
  const uniqulIngredientId: Array<TIngredientData> | undefined =
    ingredients?.filter(
      (item: TIngredientData) => itemOrder.ingredients.indexOf(item._id) !== -1,
    );

  const getUniqulIngredient = () => {
    if (uniqulIngredientId) {
      return uniqulIngredientId.filter(
        (el: TIngredientData, index: number) =>
          index === uniqulIngredientId.indexOf(el),
      );
    }
    return undefined;
  };
  const uniqullIngredient = getUniqulIngredient();
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
          {uniqullIngredient &&
            uniqullIngredient
              .slice(0, 6)
              .map((item: TIngredientData, index: number) => (
                <li className={orderCardStyle.ingredient} key={item._id}>
                  {index === 5 && (
                    <p
                      className={`${orderCardStyle.number} text text_type_digits-default`}
                    >
                      {`+${uniqullIngredient.length - 5}`}
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
          <p className="text text_type_digits-default mr-2">
            {uniqulIngredientId && price(uniqulIngredientId)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}
