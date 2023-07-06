import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");
class modalOverlay extends React.Component {
  render() {
    const { onClose } = this.props;
    return ReactDOM.createPortal(
      <div>
        <button>
          <CloseIcon type="primary" />
        </button>
      </div>,
      modalRoot,
    );
  }
}
