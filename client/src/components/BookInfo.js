import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./BookInfo.module.css";

function BookInfo(props) {
  const [isAlreadyBorrowed, setIsAlreadyBorrowed] = useState(false);

  let borrowedIds;


  if (props.users !== undefined) {
    borrowedIds = props.users.filter(
      (user) => props.currentUser.user_id === user.user_id
    );
  } else {
    borrowedIds = [];
  }

  useEffect(() => {
    if (props.currentUser.borrowed) {
      borrowedIds[0].borrowed.forEach((book) => {
        if (book === props.book.book_id) {
          setIsAlreadyBorrowed(true);
        }
      });
    }
  }, [props.book.book_id, props.currentUser.borrowed]);

  const onBorrowHandler = () => {
    setIsAlreadyBorrowed(true);
    props.setUsers(props.book, props.currentUser.user_id);
  };


  return (
    <Modal onClose={props.onClose} className={classes.modal}>
      <div className={classes.container}>
        <button onClick={props.onClose} className={classes.closeButton}>
          X
        </button>
        <img src={props.book.image} className={classes.image} />
        <div className={classes.infoBox}>
          <div>
            <strong>Title:</strong> {props.book.title}
          </div>
          <div>
            <strong>Author:</strong> {props.book.author}
          </div>
          <div>
            <strong>Genre:</strong> {props.book.genre}
          </div>
          <div>
            <strong>Published year: </strong>
            {props.book.published_year}
          </div>
          <div>
            <strong>Book Id:</strong> {props.book.book_id}
          </div>
          <div className={classes.stock}>
            {props.auth && props.currentUser.role === "Librarian" ? (
              <div className={classes.buttonBox}>
                <button className={classes.orderButton}>See borrowers</button>
                <button className={classes.orderButton}>Edit Info</button>
              </div>
            ) : props.book.stock !== 0 ? (
              <div className={classes.orderBox}>
                <div>
                  <strong>On Stock:</strong> {props.book.stock}
                </div>
                {props.auth &&
                !isAlreadyBorrowed &&
                props.currentUser.role === "Student" ? (
                  <button
                    className={classes.orderButton}
                    onClick={onBorrowHandler}
                  >
                    Borrow
                  </button>
                ) : props.auth &&
                  isAlreadyBorrowed &&
                  props.currentUser.role === "Student" ? (
                  <button className={classes.orderedButton}>
                    You already borrowed this book
                  </button>
                ) : (
                  <div className={classes.loginButton}>Login to Borrow!</div>
                )}
              </div>
            ) : (
              <div className={classes.outStock}>Out of Stock!</div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BookInfo;
