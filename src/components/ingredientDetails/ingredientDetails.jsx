import ingredientDetailsStyle from "./ingredientDetails.module.css";
import ingredientPropType from "../../utils/prop-types";

function IngredientDetails({ ingredient }) {
  return (
    <>
      <img
        className={ingredientDetailsStyle.image}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <h2
        className={`${ingredientDetailsStyle.name} text text_type_main-medium mt-4 mb-8`}
      >
        {ingredient.name}
      </h2>
      <ul
        className={`${ingredientDetailsStyle.list} text text_type_main-default text_color_inactive mb-15`}
      >
        <li className={ingredientDetailsStyle.li}>
          <p className="text text_type_main-defaul mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </li>
        <li className={ingredientDetailsStyle.li}>
          <p className="text text_type_main-defaul mb-2">Белки, г</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </li>
        <li className={ingredientDetailsStyle.li}>
          <p className="text text_type_main-defaul mb-2">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </li>
        <li className={ingredientDetailsStyle.li}>
          <p className="text text_type_main-defaul mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}
IngredientDetails.propTypes = ingredientPropType.isRequired;
export default IngredientDetails;
