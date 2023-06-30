import React from "react";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
// import { data } from "../../utils/data.js";
import {
  CurrencyIcon,
  Counter,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("one");

  return (
    <section className={burgerIngredientsStyles.section}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={burgerIngredientsStyles.tab} style={{ display: "flex" }}>
        <Tab
          value="one"
          active={current === "one"}
          onClick={setCurrent}
          href="#bun"
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={current === "two"}
          onClick={setCurrent}
          href="#sauce"
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "three"}
          onClick={setCurrent}
          href="#filling"
        >
          Начинка
        </Tab>
      </div>
      <div className="custom-scroll" style={{height: 756}} id="bun">
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={burgerIngredientsStyles.components}>
          <article className={burgerIngredientsStyles.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img
              src="https://code.s3.yandex.net/react/code/bun-02.png"
              alt="Краторная булка N-200i"
            />
            <div className="mt-1 mb-1" style={{ display: "flex" }}>
              <p className="text text_type_digits-default mr-2">20</p>
              <CurrencyIcon type="primary" />
            </div>
            <p
              className={`${burgerIngredientsStyles.name} text text_type_main-default`}
            >
              Краторная булка N-200i
            </p>
          </article>
          <article className={burgerIngredientsStyles.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img
              src="https://code.s3.yandex.net/react/code/bun-02.png"
              alt="Краторная булка N-200i"
            />
            <div className="mt-1 mb-1" style={{ display: "flex" }}>
              <p className="text text_type_digits-default mr-2">20</p>
              <CurrencyIcon type="primary" />
            </div>
            <p
              className={`${burgerIngredientsStyles.name} text text_type_main-default`}
            >
              Краторная булка N-200i
            </p>
          </article>
          <article className={burgerIngredientsStyles.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img
              src="https://code.s3.yandex.net/react/code/bun-02.png"
              alt="Краторная булка N-200i"
            />
            <div className="mt-1 mb-1" style={{ display: "flex" }}>
              <p className="text text_type_digits-default mr-2">20</p>
              <CurrencyIcon type="primary" />
            </div>
            <p
              className={`${burgerIngredientsStyles.name} text text_type_main-default`}
            >
              Краторная булка N-200i
            </p>
          </article>
          <article className={burgerIngredientsStyles.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img
              src="https://code.s3.yandex.net/react/code/bun-02.png"
              alt="Краторная булка N-200i"
            />
            <div className="mt-1 mb-1" style={{ display: "flex" }}>
              <p className="text text_type_digits-default mr-2">20</p>
              <CurrencyIcon type="primary" />
            </div>
            <p
              className={`${burgerIngredientsStyles.name} text text_type_main-default`}
            >
              Краторная булка N-200i
            </p>
          </article>
          <article className={burgerIngredientsStyles.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img
              src="https://code.s3.yandex.net/react/code/bun-02.png"
              alt="Краторная булка N-200i"
            />
            <div className="mt-1 mb-1" style={{ display: "flex" }}>
              <p className="text text_type_digits-default mr-2">20</p>
              <CurrencyIcon type="primary" />
            </div>
            <p
              className={`${burgerIngredientsStyles.name} text text_type_main-default`}
            >
              Краторная булка N-200i
            </p>
          </article>
          <article className={burgerIngredientsStyles.card}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img
              src="https://code.s3.yandex.net/react/code/bun-02.png"
              alt="Краторная булка N-200i"
            />
            <div className="mt-1 mb-1" style={{ display: "flex" }}>
              <p className="text text_type_digits-default mr-2">20</p>
              <CurrencyIcon type="primary" />
            </div>
            <p
              className={`${burgerIngredientsStyles.name} text text_type_main-default`}
            >
              Краторная булка N-200i
            </p>
          </article>
        </ul>
      </div>
      <div id="sauce">
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div id="filling">
        <h2 className="text text_type_main-medium">Начинка</h2>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </div>
    </section>
  );
};
export default BurgerIngredients;
