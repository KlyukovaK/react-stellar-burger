import PropTypes from "prop-types";
import personalAccountStyles from "./personal-account.module.css";

export function PersonalAccount({ title, children, onFormSubmit }) {
  return (
    <main className={personalAccountStyles.main}>
      <h1 className="text text_type_main-medium mb-6">{title}</h1>
      <form className={personalAccountStyles.children} onSubmit={onFormSubmit}>
        {children}
      </form>
    </main>
  );
}
PersonalAccount.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
