// import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientPropType from "../../utils/prop-types";
import ingredientsStyles from "./ingredient.module.css";

function Ingredient({ itemData, setIngredientModal }) {
  const { name, image, price } = itemData;

  const handleClick = () => {
    setIngredientModal(itemData);
  };

  return (
    <article
      className={ingredientsStyles.card}
      aria-hidden="true"
      onMouseDown={handleClick}
    >
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={image} alt={name} />
      <div className="mt-1 mb-1" style={{ display: "flex" }}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${ingredientsStyles.name} text text_type_main-default`}>
        {name}
      </p>
    </article>
  );
}

Ingredient.propTypes = ingredientPropType.isRequired;

export default Ingredient;
