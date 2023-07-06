import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../utils/prop-types";
import burgerConstructorStyles from "./burgerConstructor.module.css";

function BurgerConstructor({ data }) {
  function calculationSumа() {
    let sum = 0;
    data.forEach((item) => {
      sum += item.price;
    });
    return sum;
  }

  const arrBun = data
    .filter((item) => item.type === "bun")
    .map((item, i) => (
      <ConstructorElement
        type={i === 0 ? "top" : "bottom"}
        isLocked="true"
        text={`${item.name} ${i === 0 ? "(верх)" : "(низ)"}`}
        price={item.price}
        key={item._id}
        thumbnail={item.image}
      />
    ));
  return (
    <section className={burgerConstructorStyles.section}>
      <div
        className={`${burgerConstructorStyles.components} custom-scroll`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "end",
        }}
      >
        {arrBun[0]}
        {data
          .filter((item) => item.type !== "bun")
          .map((item) => (
            <div className={burgerConstructorStyles.component} key={item._id}>
              <DragIcon />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        {arrBun[1]}
      </div>
      <div className={burgerConstructorStyles.counts}>
        <div className="mr-10" style={{ display: "flex" }}>
          <p className="text text_type_digits-default mr-2">
            {calculationSumа()}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;
