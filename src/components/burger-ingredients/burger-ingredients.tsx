import React from "react";
import { useSelector } from "../../utils/hooks";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { TIngredientData } from "../../utils/types/data";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState<string>("bun");

  const ingredients = useSelector(
    (state) => state.ingredientsDataReducer.ingredients,
  );
  // scroll
  const [refBun, inViewBun] = useInView({
    root: document.querySelector("#scrollArea"),
    rootMargin: "-50px 0px",
    threshold: 1,
  });
  const [refSause, inViewSause] = useInView({
    root: document.querySelector("#scrollArea"),
    rootMargin: "-50px 0px",
    threshold: 1,
  });
  const [refFilling, inViewFilling] = useInView({
    root: document.querySelector("#scrollArea"),
    rootMargin: "-50px 0px",
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (inViewBun) {
      setCurrent("bun");
    } else if (inViewSause) {
      setCurrent("sauce");
    } else if (inViewFilling) {
      setCurrent("filling");
    }
  }, [inViewBun, inViewSause, inViewFilling]);

  return (
    <section className={burgerIngredientsStyles.section} id="scrollArea">
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={burgerIngredientsStyles.tab}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="filling"
          active={current === "filling"}
          onClick={setCurrent}
        >
          Начинка
        </Tab>
      </div>
      <div className={`${burgerIngredientsStyles.components} custom-scroll`}>
        <h2 className="text text_type_main-medium mb-6" id="bun">
          Булки
        </h2>
        <ul className={burgerIngredientsStyles.component} ref={refBun}>
          {ingredients?.map(
            (item) =>
              item.type === "bun" && (
                <Ingredient itemData={item} key={item._id} aria-hidden />
              ),
          )}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Соусы</h2>
        <ul className={burgerIngredientsStyles.component} ref={refSause}>
          {ingredients?.map(
            (item) =>
              item.type === "sauce" && (
                <Ingredient itemData={item} key={item._id} />
              ),
          )}
        </ul>
        <h2 className="text text_type_main-medium mb-6 mt-10">Начинка</h2>
        <ul className={burgerIngredientsStyles.component} ref={refFilling}>
          {ingredients?.map(
            (item) =>
              item.type === "main" && (
                <Ingredient itemData={item} key={item._id} />
              ),
          )}
        </ul>
      </div>
    </section>
  );
}

export default BurgerIngredients;
