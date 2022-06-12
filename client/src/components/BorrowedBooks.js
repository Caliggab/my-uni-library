import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./BorrowedBooks.module.css";

function BorrowedBooks(props) {
  let user = props.users.filter(
    (user) => user.user_id === props.currentUser.user_id
  );

  let parsedBookList = props.currentList.filter((book) =>
    user[0].borrowed.includes(book.book_id)
  );

  let list = parsedBookList.map((book) => {
    return (
      <div className={classes.tableRow}>
        <div className={classes.tableCell}>{book.book_id}</div>
        <div className={classes.tableCell}> {book.title}</div>
        <div className={classes.tableCell}>{book.author}</div>
      </div>
    );
  });

  return (
    <Modal onClose={props.onClose}>
      <button onClick={props.onClose} className={classes.closeButton}>
        X
      </button>
      <div className={classes.title}>Your Borrowed Books</div>
      {user[0].borrowed.length === 0 ? (
        <div>No Borrowed Books Yet!</div>
      ) : (
        <div>
          <div className={classes.tableContainer}>
            <div className={`${classes.tableRow} ${classes.titleRow}`}>
              <div className={classes.tableCell}>Book Id </div>
              <div className={classes.tableCell}>Title </div>
              <div className={classes.tableCell}>Author</div>
            </div>
            {list}
          </div>
          <div className={classes.ask}>Ask your librarian to return books.</div>
        </div>
      )}
    </Modal>
  );
}

export default BorrowedBooks;
