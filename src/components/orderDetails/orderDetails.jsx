import orderDetailsStyle from "./orderDetails.module.css";
import done from "../../image/done.svg";

function OrderDetails() {
  return (
    <>
      <h2 className={`${orderDetailsStyle.title} text text_type_digits-large`}>
        03456
      </h2>
      <p
        className={`${orderDetailsStyle.text} text text_type_main-medium mb-15`}
      >
        идентификатор заказа
      </p>
      <img className={orderDetailsStyle.image} src={done} alt="готово" />
      <p className={`${orderDetailsStyle.text} text text_type_main-small mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyle.text} text text_type_main-default text_color_inactive mb-30`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;
