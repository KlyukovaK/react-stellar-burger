import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
import AppContext from "../../services/AppContext";
import ModalOverlay from "../modalOverlay/modalOverlay";

const modalRoot = document.getElementById("react-modals");

function Modal({ text, children }) {
  const { addIngredientState, addIngredientDispatcher, setOrderId } =
    useContext(AppContext);

  const closePopup = () => {
    if (addIngredientState.data !== null) {
      addIngredientDispatcher({ type: "reset" });
    } else {
      setOrderId(null);
    }
  };

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return createPortal(
    <>
      <div className={modalStyles.container}>
        <div className={modalStyles.main}>
          <h1 className="text text_type_main-large">{text}</h1>
          <button
            className={modalStyles.button}
            type="button"
            onClick={closePopup}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div>{children}</div>
      </div>
      <ModalOverlay closePopup={closePopup} />
    </>,
    modalRoot,
  );
}

export default Modal;
