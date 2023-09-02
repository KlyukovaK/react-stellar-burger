import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import ingredientPropType from "../../utils/prop-types";
import { DELETE_INGREDIENTS } from "../../services/actions/burgerConstructor";
import detailConstructorStyles from "./detailConstructor.module.css";

function DetailConstructor({ ingredient, index, moveElement }) {
  // dnd for constructor element
  const dispatch = useDispatch();
  const ref = useRef(null);
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
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
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
      <DragIcon />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() =>
          dispatch({ type: DELETE_INGREDIENTS, payload: ingredient.key })
        }
      />
    </li>
  );
}

DetailConstructor.propTypes = ingredientPropType.isRequired;
export default DetailConstructor;
