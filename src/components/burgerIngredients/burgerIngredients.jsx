import React from "react";
// import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
// import ingredientPropType from "../../utils/prop-types";
import burgerIngredientsStyles from "./burgerIngredients.module.css";
import Ingredient from "../ingredient/ingredient";
import AppContext from "../../services/AppContext";

function BurgerIngredients() {
  const { data, setIngredientModal } = React.useContext(AppContext);
  const [current, setCurrent] = React.useState("bun");

  return (
    <section className={burgerIngredientsStyles.section}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={burgerIngredientsStyles.tab} style={{ display: "flex" }}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={setCurrent}
          href="#bun"
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={setCurrent}
          href="#sauce"
        >
          Соусы
        </Tab>
        <Tab
          value="filling"
          active={current === "filling"}
          onClick={setCurrent}
          href="#filling"
        >
          Начинка
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.components} custom-scroll`}>
        <h2 className="text text_type_main-medium mb-6" id="bun">
          Булки
        </h2>
        <ul className={burgerIngredientsStyles.component}>
          {data.map(
            (item) =>
              item.type === "bun" && (
                <Ingredient
                  itemData={item}
                  key={item._id}
                  aria-hidden="true"
                  setIngredientModal={setIngredientModal}
                />
              ),
          )}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
        <ul className={burgerIngredientsStyles.component}>
          {data.map(
            (item) =>
              item.type === "sauce" && (
                <Ingredient
                  itemData={item}
                  key={item._id}
                  setIngredientModal={setIngredientModal}
                />
              ),
          )}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Начинка</h2>
        <ul className={burgerIngredientsStyles.component}>
          {data.map(
            (item) =>
              item.type === "main" && (
                <Ingredient
                  itemData={item}
                  key={item._id}
                  setIngredientModal={setIngredientModal}
                />
              ),
          )}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;
