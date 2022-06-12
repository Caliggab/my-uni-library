import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import AddBook from "./AddBook";
import BookRow from "./BookRow";
import classes from "./BooksAdmin.module.css";

function BooksAdmin(props) {
  const [displayAddBook, setDisplayAddBook] = useState(false);
  const [displayDeleteBook, setDisplayDeleteBook] = useState(false);

  const onHandleOpenAdd = () => {
    setDisplayAddBook(true);
  };

  const onHandleCloseAdd = () => {
    setDisplayAddBook(false);
  };
  const onHandleOpenDelete = () => {
    setDisplayDeleteBook(true);
  };
  const onHandleCloseDelete = () => {
    setDisplayDeleteBook(false);
  };

  let Books = props.bookList
    .sort((a, b) => a.book_id - b.book_id)
    .map((Book) => {
      return (
        <BookRow
          book={Book}
          deleteBook={props.deleteBook}
          currentBook={props.currentBook}
          returnBook={props.returnBook}
          users={props.users}
        />
      );
    });

  return (
    <div className={classes.container}>
      <div className={classes.title}>Book List</div>

      <button className={classes.button} onClick={onHandleOpenAdd}>
        <FaBook className={classes.icon} />
        Add Book
      </button>

      {displayAddBook ? (
        <AddBook onClose={onHandleCloseAdd} addBook={props.addBook} />
      ) : (
        ""
      )}

      <div className={classes.topRow}>
        <div className={classes.cell}>Id</div>
        <div className={classes.cell}>Title</div>
        <div className={classes.cell}>Author</div>
        <div className={classes.cell}>Year</div>
        <div className={classes.cell}>Genre</div>
        <div className={classes.cell}>Stock</div>
        <div className={classes.cell}>Borrowed By</div>
        {/* <div className={classes.cell}>Change</div> */}
        {/* <div className={classes.cell}>Delete</div> */}
      </div>
      {Books}
    </div>
  );
}

export default BooksAdmin;
