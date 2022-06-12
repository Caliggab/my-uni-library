import React, { useState } from "react";
import Modal from "../UI/Modal";
import classes from "./DeleteUserPrompt.module.css";

function DeleteUserPrompt(props) {
  const [invalid, setInvalid] = useState(false);
  const [hasBorrowedBooks, setHasBorrowedBooks] = useState(false);

  const onDeleteHandler = () => {
    if (props.currentUser.user_id === props.id) {
      setInvalid(true);
      return;
    }

    if (props.borrowedBooks.length > 0) {
      setHasBorrowedBooks(true);
      return;
    }

    props.deleteUser(props.id);
    props.close();
  };

  return (
    <Modal onClose={props.close}>
      <button onClick={props.close} className={classes.closeButton}>
        X
      </button>
      <div className={classes.container}>
        <div className={classes.text}>
          Are you sure you want to delete this user?
        </div>
        {invalid ? (
          <div className={classes.error}>You can't delete yourself!</div>
        ) : (
          ""
        )}
        {hasBorrowedBooks ? (
          <div className={classes.error}>
            This user has borrowed books. Please return them first before
            deleting.
          </div>
        ) : (
          ""
        )}

        <div className={classes.buttonBox}>
          <button className={classes.yesButton} onClick={onDeleteHandler}>
            Yes
          </button>
          <button className={classes.noButton} onClick={props.close}>
            No
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteUserPrompt;
