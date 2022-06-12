import React, { useState } from "react";
import DeleteUserPrompt from "./DeleteUserPrompt";
import classes from "./UserRow.module.css";

function UserRow(props) {
  const [displayDeleteUser, setDisplayDeleteUser] = useState(false);

  const onHandleOpenDelete = () => {
    setDisplayDeleteUser(true);
  };

  const onHandleCloseDelete = () => {
    setDisplayDeleteUser(false);
  };

  return (
    <div className={classes.row}>
      <div className={classes.cell}>{props.user.user_id}</div>
      <div className={classes.cell}>{props.user.username}</div>
      <div className={classes.cell}>{props.user.firstname} </div>
      <div className={classes.cell}>{props.user.lastname} </div>
      <div className={classes.cell}>{props.user.email}</div>
      <div className={classes.cell}>{props.user.role}</div>
      {/* <div className={classes.cell}>
          <button className={classes.changeButton}>Change</button>
        </div> */}
      <div className={classes.cell}>
        <button className={classes.deleteButton} onClick={onHandleOpenDelete} >
          Delete
        </button>
      </div>
      {displayDeleteUser ? (
        <DeleteUserPrompt
          close={onHandleCloseDelete}
          deleteUser={props.deleteUser}
          id={props.user.user_id}
          borrowedBooks={props.user.borrowed}
          currentUser={props.currentUser}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default UserRow;
