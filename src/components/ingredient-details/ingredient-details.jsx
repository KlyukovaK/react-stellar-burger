import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ingredientDetailsStyle from "./ingredient-details.module.css";

function IngredientDetails() {
  const { ingredientId } = useParams();
  const [ingredientDetail, setIngredientDetail] = useState(null);
  const { ingredients, ingredientRequest, ingredientFaild } = useSelector(
    (state) => state.ingredientsDataReducer,
  );

  const selectIngredient = useCallback(() => {
    if (ingredients) {
      setIngredientDetail(
        ingredients.filter((item) => item._id === ingredientId),
      );
    }
  }, [ingredients, ingredientId]);

  useEffect(() => {
    selectIngredient();
  }, [ingredientId, selectIngredient]);

  return (
    <>
      {ingredientFaild && <p>Произошла ошибка при получении данных</p>}
      {ingredientRequest && <p>Загрузка...</p>}
      {ingredientDetail && (
        <main>
          <img
            className={ingredientDetailsStyle.image}
            src={ingredientDetail[0].image}
            alt={ingredientDetail[0].name}
          />
          <h2
            className={`${ingredientDetailsStyle.name} text text_type_main-medium mt-4 mb-8`}
          >
            {ingredientDetail[0].name}
          </h2>
          <ul
            className={`${ingredientDetailsStyle.list} text text_type_main-default text_color_inactive mb-15`}
          >
            <li className={ingredientDetailsStyle.li} key="calories">
              <p className="text text_type_main-defaul mb-2">Калории,ккал</p>
              <p className="text text_type_digits-default">
                {ingredientDetail[0].calories}
              </p>
            </li>
            <li className={ingredientDetailsStyle.li} key="proteins">
              <p className="text text_type_main-defaul mb-2">Белки, г</p>
              <p className="text text_type_digits-default">
                {ingredientDetail[0].proteins}
              </p>
            </li>
            <li className={ingredientDetailsStyle.li} key="fat">
              <p className="text text_type_main-defaul mb-2">Жиры, г</p>
              <p className="text text_type_digits-default">
                {ingredientDetail[0].fat}
              </p>
            </li>
            <li className={ingredientDetailsStyle.li} key="carbohydrates">
              <p className="text text_type_main-defaul mb-2">Углеводы, г</p>
              <p className="text text_type_digits-default">
                {ingredientDetail[0].carbohydrates}
              </p>
            </li>
          </ul>
        </main>
      )}
    </>
  );
}

export default IngredientDetails;
