import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "../../utils/hooks";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  CHANGE_BUN,
  CLEAN_INGREDIENTS,
  MOVE_ELEMENT,
} from "../../services/constants/burgerConstructor";
import { addIngredient } from "../../services/actions/burgerConstructor";
import { getOrder } from "../../services/actions/orderDetails";
import DetailConstructor from "../detail-constructor/detail-constructor";
import { TIngredientData } from "../../utils/types/data";

function BurgerConstructor() {
  const { bun, ingredient } = useSelector((state) => state.ingredientsReducer);
  const { orderSuccess } = useSelector((state) => state.orderReducer);
  const { user } = useSelector((state) => state.formAuthReducer);
  const allIngredient = [...bun, ...ingredient];
  const getIdIngredient = allIngredient.map((item) => item._id);
  const navigate = useNavigate();
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
  const handleClick = (): void => {
    if (user) {
      dispatch(getOrder(getIdIngredient));
    }
    navigate("/login");
  };
  useEffect(() => {
    if (orderSuccess) {
      dispatch({ type: CLEAN_INGREDIENTS });
    }
  }, [orderSuccess]);
  // dnd
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(itemData: TIngredientData) {
      if (itemData.type === "bun" && bun.length === 0) {
        dispatch(addIngredient(itemData));
      }
      if (bun.length === 1) {
        dispatch({ type: CHANGE_BUN, payload: itemData });
      }
      if (itemData.type !== "bun") {
        dispatch(addIngredient(itemData));
      }
    },
  });

  const moveElement = useCallback(
    (dragIndex: number, hoverIndex: number): void => {
      dispatch({
        type: MOVE_ELEMENT,
        payload: {
          dragIndex,
          hoverIndex,
        },
      });
    },
    [],
  );

  return (
    <section className={burgerConstructorStyles.section} ref={dropRef}>
      <div className={`${burgerConstructorStyles.components}`}>
        {bun.length > 0 && (
          <div className="pr-3">
            <ConstructorElement
              type="top"
              isLocked
              text={`${bun[0].name} (верх)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
        <ul className={`${burgerConstructorStyles.list} custom-scroll`}>
          {ingredient.length > 0 &&
            ingredient.map((item, index: number) => {
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
              isLocked
              text={`${bun[0].name} (низ)`}
              price={bun[0].price}
              thumbnail={bun[0].image}
            />
          </div>
        )}
      </div>
      {bun.length > 0 && (
        <div className={burgerConstructorStyles.counts}>
          <div className={`${burgerConstructorStyles.count} mr-10`}>
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
      )}
    </section>
  );
}

export default BurgerConstructor;
