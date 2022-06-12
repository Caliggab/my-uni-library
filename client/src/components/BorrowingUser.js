import React from "react";
import classes from "./BorrowingUser.module.css";

function BorrowingUser(props) {
  const onReturnHandler = () => {
      let bookId = props.bookId 
      let userId = props.userId
    props.returnBook(bookId, userId);
  };



  return (
    <div className={classes.borrowedContainer}>
      {`${props.firstName} ${props.lastName}`}
      <button className={classes.returnButton} onClick={onReturnHandler}>
        Return
      </button>
    </div>
  );
}

export default BorrowingUser;
