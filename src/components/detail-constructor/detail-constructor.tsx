import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDispatch } from "../../utils/hooks";
import { useDrop, useDrag } from "react-dnd";
import detailConstructorStyles from "./detail-constructor.module.css";
import { TIngredientData } from "../../utils/types/data";
import { DELETE_INGREDIENTS } from "../../services/constants/burgerConstructor";

type TDetailConstructor = {
  ingredient: TIngredientData;
  index: number;
  moveElement(dragIndex: number, hoverIndex: number): void;
};

function DetailConstructor({
  ingredient,
  index,
  moveElement,
}: TDetailConstructor) {
  // dnd for constructor element
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: "element",
    item: () => {
      return { id: ingredient.key, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  const [, drop] = useDrop({
    accept: "element",
    hover: (item: TDetailConstructor, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveElement(dragIndex, hoverIndex);
      item.index = hoverIndex; // eslint-disable-line no-param-reassign
    },
  });

  drag(drop(ref));

  return (
    <li
      className={detailConstructorStyles.component}
      key={ingredient.key}
      ref={ref}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={(): void =>
          dispatch({ type: DELETE_INGREDIENTS, payload: ingredient.key })
        }
      />
    </li>
  );
}

export default DetailConstructor;
