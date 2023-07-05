import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../utils/prop-types";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import Ingredient from "../ingredient/ingredient";

function BurgerIngredients({ data }) {
  console.log({ data });
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
      <div className={`${burgerIngredientsStyles.components} custom-scroll`}>
        <h2 className="text text_type_main-medium" id="bun">
          Булки
        </h2>
        <ul className={burgerIngredientsStyles.component}>
          {{ data }.map(
            (item) =>
              item.type === "bun" && <Ingredient {...item} key={item._id} />,
          )}
        </ul>
        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={burgerIngredientsStyles.component}>
          {{ data }.map(
            (item) =>
              item.type === "sauce" && <Ingredient {...item} key={item._id} />,
          )}
        </ul>
        <h2 className="text text_type_main-medium">Начинка</h2>
        <ul className={burgerIngredientsStyles.component}>
          {{ data }.map(
            (item) =>
              item.type === "main" && <Ingredient {...item} key={item._id} />,
          )}
        </ul>
      </div>
    </section>
  );
}
BurgerIngredients.PropTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
export default BurgerIngredients;
