import React, { useState } from "react";
import classes from "./BookRow.module.css";
import BorrowedBy from "./BorrowedBy";

function BookRow(props) {
  // let borrowed = [];
  // props.book.borrowed_by.map((user) => borrowed.push(user));

  return (
    <div className={classes.row}>
      <div className={classes.cell}>{props.book.book_id}</div>
      <div className={classes.cell}>{props.book.title}</div>
      <div className={classes.cell}>{props.book.author}</div>
      <div className={classes.cell}>{props.book.published_year}</div>
      <div className={classes.cell}>{props.book.genre}</div>
      <div className={classes.cell}>{props.book.stock}</div>
      <div className={classes.cell}>
        <BorrowedBy
          borrowedList={props.book.borrowed_by}
          returnBook={props.returnBook}
          bookId={props.book.book_id}
          book={props.book}
          users={props.users}
        />
      </div>

      {/* <div className={classes.cell}>Change</div> */}
      {/* <div className={classes.cell}>
            <button className={classes.changeButton}>Change</button>
          </div> */}
      {/* {displayDeleteUser ? (
          <DeleteUserPrompt
            close={onHandleCloseDelete}
            deleteUser={props.deleteUser}
            id={props.user.id}
            currentUser={props.currentUser}
          />
        ) : (
          ""
        )} */}
    </div>
  );
}

export default BookRow;
