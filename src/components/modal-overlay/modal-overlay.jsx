import PropTypes from "prop-types";
import modalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ closePopup }) {
  return (
    <div
      aria-hidden="true"
      className={modalOverlayStyles.overlay}
      onMouseDown={closePopup}
    />
  );
}

ModalOverlay.propTypes = {
  closePopup: PropTypes.func.isRequired,
};

export default ModalOverlay;
