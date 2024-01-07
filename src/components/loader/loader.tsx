import PropTypes from "prop-types";
import loaderStyle from "./loader.module.css";

export function Loader({ text }: { text: string }) {
  return (
    <div className={loaderStyle.boxLoader}>
      <h1 className={`${loaderStyle.text} text text_type_main-large`}>
        {text}
      </h1>
      <div className={loaderStyle.loader} />
    </div>
  );
}

Loader.propTypes = {
  text: PropTypes.string.isRequired,
};
