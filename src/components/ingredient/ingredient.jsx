import { useContext } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppContext from "../../services/AppContext";
import ingredientPropType from "../../utils/prop-types";
import ingredientsStyles from "./ingredient.module.css";

function Ingredient({ itemData }) {
  const { addIngredientDispatcher } = useContext(AppContext);
  const handleClick = () => {
    addIngredientDispatcher({ type: "set", payload: itemData });
  };

  return (
    <article
      className={ingredientsStyles.card}
      aria-hidden="true"
      onClick={handleClick}
    >
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={itemData.image} alt={itemData.name} />
      <div className="mt-1 mb-1" style={{ display: "flex" }}>
        <p className="text text_type_digits-default mr-2">{itemData.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientsStyles.name} text text_type_main-default`}>
        {itemData.name}
      </p>
    </article>
  );
}

Ingredient.propTypes = ingredientPropType.isRequired;

export default Ingredient;
