import modalOverlayStyles from "./modal-overlay.module.css";

function ModalOverlay({ closePopup }: { closePopup(): void }) {
  return (
    <div
      aria-hidden="true"
      className={modalOverlayStyles.overlay}
      onMouseDown={closePopup}
    />
  );
}

export default ModalOverlay;
