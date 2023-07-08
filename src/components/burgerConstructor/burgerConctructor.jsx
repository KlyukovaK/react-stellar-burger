import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../utils/prop-types";
import burgerConstructorStyles from "./burgerConstructor.module.css";

function BurgerConstructor({ data, setOrderId }) {
  function calculationSumа() {
    let sum = 0;
    data.forEach((item) => {
      sum += item.price;
    });
    return sum;
  }
  // изменение стейта для открытия popup
  const handleClick = () => {
    setOrderId("685314687");
  };

  const arrBun = data
    .filter((item) => item.type === "bun")
    .map((item, i) => (
      <div className="pr-3">
        <ConstructorElement
          type={i === 0 ? "top" : "bottom"}
          isLocked="true"
          text={`${item.name} ${i === 0 ? "(верх)" : "(низ)"}`}
          price={item.price}
          key={item._id}
          thumbnail={item.image}
        />
      </div>
    ));
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
        {arrBun[0]}
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {data
            .filter((item) => item.type !== "bun")
            .map((item) => (
              <li className={burgerConstructorStyles.component} key={item._id}>
                <DragIcon />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            ))}
        </ul>
        {arrBun[1]}
      </div>
      <div className={burgerConstructorStyles.counts}>
        <div className="mr-10" style={{ display: "flex" }}>
          <p className="text text_type_digits-default mr-2">
            {calculationSumа()}
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  setOrderId: PropTypes.func.isRequired,
};

export default BurgerConstructor;