import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./Book.module.css";
import BookInfo from "./BookInfo";

function Book(props) {
  const [displayInfo, setDisplayInfo] = useState(false);

  const handleOpenInfo = () => {
    setDisplayInfo(true);
  };
  const handleCloseInfo = () => {
    setDisplayInfo(false);
  };


  return (
    <Card className={classes.card}>
      <div className={classes.container}>
        <div>
          <img src={props.book.image} className={classes.image}></img>
        </div>
        <div className={classes.infoBox}>
          <div>{props.book.title}</div>
          <div>By {props.book.author}</div>
          <div>{props.book.genre}</div>
          {props.currentUser.role === "Student" || !props.currentUser.role ? (
            <div className={classes.infoButton} onClick={handleOpenInfo}>
              More info
            </div>
          ) : (
            ""
          )}
        </div>
        {displayInfo ? (
          <BookInfo
            book={props.book}
            onClose={handleCloseInfo}
            setUsers={props.setUsers}
            auth={props.auth}
            currentUser={props.currentUser}
            users={props.users}
          />
        ) : (
          ""
        )}
      </div>
    </Card>
  );
}

export default Book;
