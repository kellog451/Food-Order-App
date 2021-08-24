import React from "react";
import mealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartBtn from "./HeaderCartBtn";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartBtn/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImg} alt="Meals"/>
      </div>
    </React.Fragment>
  );
}

export default Header;