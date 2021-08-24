import { useReducer } from "react";
import CartContext from "./CartContext";

const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedAmount = state.totalAmount + action.value.price;
    //check for the index of added item to match.
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.value.id;
    });

    //get existing item using the got index.
    const existingItem = state.items[existingCartItemIndex];

    let updatedItems;
    let updatedItem;

    //check if exstingItem exists
    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + 1, //increment existing item's qty.
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItem = { ...action.value };
      updatedItems = state.items.concat(action.value);
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  //deleting items.
  if (action.type === "REMOVE_ITEM") {
    //check for the index of added item to match.
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.value;
    });

    //get existing item using the got index.
    const existingItem = state.items[existingCartItemIndex];

    const updatedAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    let updatedItem;

    //check if exstingItem exists
    if (existingItem.amount === 1) {
      //filter out deleted element -> return new array.
      updatedItems = state.items.filter((item) => item.id !== action.value);
    } else {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1, //decrement existing item's qty.
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount
    };
  }
  return defaultCartState;
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD_ITEM",
      value: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      value: id,
    });
  };

  //set initial context state.
  const cartContext = {
    showCart: props.value.showCart,
    showCartHandler: props.value.showCartHandler,
    hideCartHandler: props.value.hideCartHandler,
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
