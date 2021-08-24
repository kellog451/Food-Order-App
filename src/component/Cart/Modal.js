import classes from "./Modal.module.css";
import REACTDOM from "react-dom";
import { Fragment } from "react";
//import CartContext from "../Context/CartContext";

const Backdrop = (props) => {
  ///const ctx = useContext(CartContext);
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ModelOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {!props.showCart && REACTDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
      {!props.showCart &&
        REACTDOM.createPortal(
          <ModelOverlay>{props.children}</ModelOverlay>,
          portalElement
        )}
    </Fragment>
  );
};

export default Modal;
