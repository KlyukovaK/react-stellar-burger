import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import ingredientPropType from "../../utils/prop-types";
import ingredientsStyles from "./ingredient.module.css";
import { addIngredientDetail } from "../../services/actions/ingredientPopup";
// import { POPUP_INGREDIENT_DETEAILS_OPEN } from "../../services/actions/modalIngredientDeteails";

function Ingredient({ itemData }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addIngredientDetail(itemData));
  };
  // dnd
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: itemData,
  });
  // count
  const { bun, ingredient } = useSelector((state) => state.ingredientsReducer);
  const allIngredient = [...bun, ...ingredient, ...bun];

  const count = useMemo(() => {
    const selectIngredients = allIngredient.filter(
      (item) => item._id === itemData._id,
    );
    return selectIngredients.length;
  }, [allIngredient]);

  return (
    <article
      className={ingredientsStyles.card}
      aria-hidden="true"
      onClick={handleClick}
      ref={dragRef}
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
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
