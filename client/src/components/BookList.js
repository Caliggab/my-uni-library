import React from "react";
import Book from "./Book";
import classes from "./BookList.module.css";

function BookList(props) {
  let displayList = [];

  if (props.searchTerm && props.category) {
    displayList = props.list
      .sort((a, b) => a.book_id - b.book_id)
      .filter((book) =>
        book[props.category]
          .toLowerCase()
          .includes(props.searchTerm.toLowerCase())
      )
      .map((book) => (
        <Book
          key={book.book_id}
          book={book}
          setUsers={props.setUsers}
          className={classes.book}
          auth={props.auth}
          currentUser={props.currentUser}
          users={props.users}
        />
      ));
  } else {
    displayList = props.list
      .sort((a, b) => a.book_id - b.book_id)
      .map((book) => (
        <Book
          key={book.book_id}
          book={book}
          setUsers={props.setUsers}
          className={classes.book}
          auth={props.auth}
          currentUser={props.currentUser}
          users={props.users}
        />
      ));
  }

  return (
    <div>
      {displayList.length === 0 ? (
        <div className={`${classes.container} ${classes.empty}`}>
          Sorry! There's no results for your query 😔
        </div>
      ) : (
        <div className={classes.container}>{displayList}</div>
      )}
    </div>
  );
}

export default BookList;
