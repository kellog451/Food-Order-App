import classes from "./MealItemForm.module.css";
import Input from "./Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [amountValid, setAmountValid] = useState(true);
  const amountInputRef = useRef();

  //form submission
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const amountNumber = +enteredAmount;

    if(enteredAmount.trim().length === 0 || amountNumber < 1 || amountNumber > 5){
      setAmountValid(false);
      return;
    }

    props.onAddToCart(amountNumber);
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input 
        ref={amountInputRef}
        label="Amount" 
        input={{
        id: 'amount'+ props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
      }}/>
      <button type='submit'>Add</button>
      {!amountValid && <p>Please Enter a valid Amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
