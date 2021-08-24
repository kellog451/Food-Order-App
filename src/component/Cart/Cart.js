import classes from "./Cart.module.css";
import Modal from "./Modal";
import CartContext from "../../Context/CartContext";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  //get context
  const cartCtx = useContext(CartContext);

  //add item to cart function
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  //remove cart items
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  //get context cart items array.
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id + Math.random()}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  //get context total amount.
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  //check for length of cart items array
  const cartIsEmpty = cartCtx.items.length > 0;

  const closeModalHandler = () => {
    props.hideCart();
  };

  return (
    <Modal onClick={closeModalHandler}>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={closeModalHandler}
          >
            Close
          </button>
          {cartIsEmpty && <button className={classes.button}>Order Now</button>}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
