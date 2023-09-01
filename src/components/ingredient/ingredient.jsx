import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import ingredientPropType from "../../utils/prop-types";
import ingredientsStyles from "./ingredient.module.css";
import { addIngridient } from "../../services/actions/burgerConstructor";
import { addIngredientDetail } from "../../services/actions/ingredientPopup";
// import { POPUP_INGREDIENT_DETEAILS_OPEN } from "../../services/actions/modalIngredientDeteails";

function Ingredient({ itemData }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addIngridient(itemData));
  };

  return (
    <article
      className={ingredientsStyles.card}
      aria-hidden="true"
      onClick={handleClick}
    >
      <Counter count={0} size="default" extraClass="m-1" />
      <img src={itemData.image} alt={itemData.name} />
      <div
        className="mt-1 mb-1"
        style={{ display: "flex" }}
        onMouseDown={() => dispatch(addIngredientDetail(itemData))}
        role="button"
        tabIndex={0}
      >
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
