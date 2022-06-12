import React from "react";
import classes from "./BorrowedBy.module.css";
import BorrowingUser from "./BorrowingUser";

function BorrowedBy(props) {
  let parsedUserList = props.users.filter((user) =>
    props.book.borrowed_by.includes(user.user_id)
  );


  let list = parsedUserList.map((user) => {
    return (
      <BorrowingUser
        returnBook={props.returnBook}
        firstName={user.firstname}
        lastName={user.lastname}
        userId={user.user_id}
        bookId={props.bookId}
      />
    );
  });

  if (props.borrowedList.length > 0) {
    return <div className={classes.container}>{list}</div>;
  } else {
    return <div></div>;
  }
}

export default BorrowedBy;
