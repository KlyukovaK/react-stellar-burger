import PropTypes from "prop-types";
import { OrderCard } from "../order-card/order-card";
import historyOfOrdersStyle from "./history-of-orders.module.css";

export function HistoryOfOrders({ text, orders }) {
  return (
    <section className={historyOfOrdersStyle.section}>
      <h1 className="text text_type_main-large mb-4">{text}</h1>
      <ul className={`${historyOfOrdersStyle.components} custom-scroll`}>
        {orders.orders.map((item) => (
          <OrderCard itemOrder={item} key={item._id} aria-hidden="true" />
        ))}
      </ul>
    </section>
  );
}
HistoryOfOrders.propTypes = {
  text: PropTypes.string.isRequired,
  orders: PropTypes.oneOfType([PropTypes.object]),
};
