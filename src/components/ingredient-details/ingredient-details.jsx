import { useSelector } from "react-redux";
import ingredientDetailsStyle from "./ingredient-details.module.css";

function IngredientDetails() {
  const { ingradientDetail } = useSelector(
    (state) => state.initialIngredientDetailReducer,
  );
  return (
    <>
      <img
        className={ingredientDetailsStyle.image}
        src={ingradientDetail.image}
        alt={ingradientDetail.name}
      />
      <h2
        className={`${ingredientDetailsStyle.name} text text_type_main-medium mt-4 mb-8`}
      >
        {ingradientDetail.name}
      </h2>
      <ul
        className={`${ingredientDetailsStyle.list} text text_type_main-default text_color_inactive mb-15`}
      >
        <li className={ingredientDetailsStyle.li}>
          <p className="text text_type_main-defaul mb-2">Калории,ккал</p>
          <p className="text text_type_digits-default">
            {ingradientDetail.calories}
          </p>
        </li>
        <li className={ingredientDetailsStyle.li}>
          <p className="text text_type_main-defaul mb-2">Белки, г</p>
          <p className="text text_type_digits-default">
            {ingradientDetail.proteins}
          </p>
        </li>
        <li className={ingredientDetailsStyle.li}>
          <p className="text text_type_main-defaul mb-2">Жиры, г</p>
          <p className="text text_type_digits-default">
            {ingradientDetail.fat}
          </p>
        </li>
        <li className={ingredientDetailsStyle.li}>
          <p className="text text_type_main-defaul mb-2">Углеводы, г</p>
          <p className="text text_type_digits-default">
            {ingradientDetail.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}

export default IngredientDetails;
