import { useContext } from "react";
// import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
// import ingredientPropType from "../../utils/prop-types";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import AppContext from "../../services/AppContext";

function BurgerConstructor() {
  const { setOrderId, addIngredientState, getOrder } = useContext(AppContext);
  const ingredients = addIngredientState.ingredient;

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

  // изменение стейта для открытия popup
  const handleClick = () => {
    setOrderId("685314687");
    getOrder();
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
        {ingredients.length > 0 &&
          ingredients
            .filter((item) => item.type === "bun")
            .map(
              (item, i) =>
                i === 0 && (
                  <div className="pr-3">
                    <ConstructorElement
                      type="top"
                      isLocked="true"
                      text={`${item.name} (верх)`}
                      price={item.price}
                      key={item._id}
                      thumbnail={item.image}
                    />
                  </div>
                ),
            )}
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {ingredients.length > 0 &&
            ingredients
              .filter((item) => item.type !== "bun")
              .map((item) => (
                <li
                  className={burgerConstructorStyles.component}
                  key={item._id}
                >
                  <DragIcon />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              ))}
        </ul>
        {ingredients.length > 0 &&
          ingredients
            .filter((item) => item.type === "bun")
            .map(
              (item, i) =>
                i === 0 && (
                  <div className="pr-3">
                    <ConstructorElement
                      type="bottom"
                      isLocked="true"
                      text={`${item.name} (низ)`}
                      price={item.price}
                      key={item._id}
                      thumbnail={item.image}
                    />
                  </div>
                ),
            )}
      </div>
      <div className={burgerConstructorStyles.counts}>
        <div className="mr-10" style={{ display: "flex" }}>
          <p className="text text_type_digits-default mr-2">
            {calculationSumа(ingredients)}
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
