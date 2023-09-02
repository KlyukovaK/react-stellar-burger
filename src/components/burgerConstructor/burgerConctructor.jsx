import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import burgerConstructorStyles from "./burgerConstructor.module.css";
import {
  addIngridient,
  CHANGE_BUN,
  MOVE_ELEMENT,
} from "../../services/actions/burgerConstructor";
import { getOrder } from "../../services/actions/orderDetails";
import DetailConstructor from "../detailConstructor/detailConstructor";

function BurgerConstructor() {
  const { bun, ingredient } = useSelector((state) => state.ingredientsReducer);
  const allIngredient = [...bun, ...ingredient];
  const getIdIngredient = allIngredient.map((item) => item._id);

  const totalPrice = useMemo(() => {
    if (allIngredient.length === 0) {
      return 0;
    }
    return allIngredient.reduce((acc, curr) => {
      if (curr.type === "bun") {
        return acc + 2 * curr.price;
      }
      return acc + curr.price;
    }, 0);
  }, [allIngredient]);

  const dispatch = useDispatch();

  // open popupOrder
  const handleClick = () => {
    dispatch(getOrder(getIdIngredient));
  };
  // dnd
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(itemData) {
      if (itemData.type === "bun" && bun.length === 0) {
        dispatch(addIngridient(itemData));
      }
      if (bun.length === 1) {
        dispatch({ type: CHANGE_BUN, payload: itemData });
      }
      if (itemData.type !== "bun") {
        dispatch(addIngridient(itemData));
      }
    },
  });

  const moveElement = useCallback((dragIndex, hoverIndex) => {
    dispatch({
      type: MOVE_ELEMENT,
      payload: {
        dragIndex,
        hoverIndex,
      },
    });
  }, []);

  return (
    <section className={burgerConstructorStyles.section} ref={dropRef}>
      <div
        className={`${burgerConstructorStyles.components}`}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "end",
        }}
      >
        {bun.length > 0 && (
          <div className="pr-3">
            <ConstructorElement
              type="top"
              isLocked="true"
              text={`${bun[0].name} (верх)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {ingredient.length > 0 &&
            ingredient.map((item, index) => {
              return (
                <DetailConstructor
                  ingredient={item}
                  index={index}
                  key={item.key}
                  moveElement={moveElement}
                />
              );
            })}
        </ul>
        {bun.length > 0 && (
          <div className="pr-3">
            <ConstructorElement
              type="bottom"
              isLocked="true"
              text={`${bun[0].name} (низ)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
      </div>
      <div className={burgerConstructorStyles.counts}>
        <div className="mr-10" style={{ display: "flex" }}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
