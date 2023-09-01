import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import { DELETE_INGREDIENTS } from "../../services/actions/burgerConstructor";
import { getOrder } from "../../services/actions/orderDetails";

function BurgerConstructor() {
  const { ingredient } = useSelector((state) => state.ingredientsReducer);
  function calculationSumа(orders) {
    if (orders === undefined || orders.length === 0) {
      return 0;
    }
    return orders.reduce((acc, curr) => {
      if (curr.type === "bun") {
        return acc + 2 * curr.price;
      }
      return acc + curr.price;
    }, 0);
  }
  const getIdIngredient = ingredient.map((item) => item._id);
  const dispatch = useDispatch();

  const bun = ingredient
    .filter((item) => item.type === "bun")
    .map((item, i) => i === 0 && item);

  const handleClickDelete = () => {
    dispatch({ type: DELETE_INGREDIENTS });
  };

  // изменение стейта для открытия popup
  const handleClick = () => {
    dispatch(getOrder(getIdIngredient));
  };

  return (
    <section className={burgerConstructorStyles.section}>
      <div
        className={`${burgerConstructorStyles.components}`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "end",
        }}
      >
        {bun.length > 0 && (
          <div className="pr-3">
            <ConstructorElement
              type="top"
              isLocked="true"
              text={`${bun[0].name} (верх)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {ingredient.length > 0 &&
            ingredient
              .filter((item) => item.type !== "bun")
              .map((item) => (
                <li
                  className={burgerConstructorStyles.component}
                  key={item.key}
                >
                  <DragIcon />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    onClick={handleClickDelete}
                  />
                </li>
              ))}
        </ul>
        {bun.length > 0 && (
          <div className="pr-3">
            <ConstructorElement
              type="bottom"
              isLocked="true"
              text={`${bun[0].name} (низ)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
      </div>
      <div className={burgerConstructorStyles.counts}>
        <div className="mr-10" style={{ display: "flex" }}>
          <p className="text text_type_digits-default mr-2">
            {calculationSumа(ingredient)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

// BurgerConstructor.propTypes = {
// data: PropTypes.arrayOf(ingredientPropType).isRequired,
//   setOrderId: PropTypes.func.isRequired,
// };

export default BurgerConstructor;
