import React from "react";

const CartContext = React.createContext({
  showCart: false,
  showCartHandler: () => {},
  hideCartHandler: () => {},
  items: [],
  totalAmount: 0,
  AddItem: (item) => {},
  removeItem: (id) => {},
});


export default CartContext;
