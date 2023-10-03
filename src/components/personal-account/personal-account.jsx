import PropTypes from "prop-types";
import personalAccountStyles from "./personal-account.module.css";

export function PersonalAccount({ title, children }) {
  return (
    <main className={personalAccountStyles.main}>
      <h1 className="text text_type_main-large mb-6">{title}</h1>
      <div className={personalAccountStyles.children}>{children}</div>
    </main>
  );
}
PersonalAccount.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
