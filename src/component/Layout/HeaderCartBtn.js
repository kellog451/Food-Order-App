import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Context/CartContext";
import classes from "./HeaderCartBtn.module.css";

const HeaderCartBtn = () => {
  //state to update when cart button is animated.
  const [btnAnimate, setBtnAnimation] = useState(false);

  const ctx = useContext(CartContext);

  const num_of_items = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  //adding animation css dynamically.
  const btnClasses = `${classes.button} ${btnAnimate ? classes.bump : ''}`;

  useEffect(() => {
    if(ctx.items.length === 0){
      return;
    }
      setBtnAnimation(true);
    
    const timer = setTimeout(() => {
      //reset animation after 300ms. to work again for other cart additions.
      setBtnAnimation(false);
    }, 300);

    return () => {clearTimeout(timer)};
  }, [ctx.items]);

  
  return (
    <React.Fragment>
      <button className={btnClasses} onClick={ctx.showCartHandler}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{num_of_items}</span>
      </button>
    </React.Fragment>
  );
};

export default HeaderCartBtn;
