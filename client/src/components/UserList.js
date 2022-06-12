import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import AddUser from "./AddUser";
import DeleteUserPrompt from "./DeleteUserPrompt";
import classes from "./UserList.module.css";
import UserRow from "./UserRow";

function UserList(props) {
  const [displayAddUser, setDisplayAddUser] = useState(false);
  const [displayDeleteUser, setDisplayDeleteUser] = useState(false);

  const onHandleOpenAdd = () => {
    setDisplayAddUser(true);
  };

  const onHandleCloseAdd = () => {
    setDisplayAddUser(false);
  };
  const onHandleOpenDelete = () => {
    setDisplayDeleteUser(true);
  };
  const onHandleCloseDelete = () => {
    setDisplayDeleteUser(false);
  };

  let users = props.users
    .sort((a, b) => a.user_id - b.user_id)
    .map((user) => {
      return (
        <UserRow
          user={user}
          deleteUser={props.deleteUser}
          currentUser={props.currentUser}
        />
      );
    });

  return (
    <div className={classes.container}>
      <div className={classes.title}>User List</div>

      <button className={classes.button} onClick={onHandleOpenAdd}>
        <FaUserPlus className={classes.icon} />
        Add User
      </button>

      {displayAddUser ? (
        <AddUser onClose={onHandleCloseAdd} addUser={props.addUser} />
      ) : (
        ""
      )}

      <div className={classes.topRow}>
        <div className={classes.cell}>Id</div>
        <div className={classes.cell}>Username</div>
        <div className={classes.cell}>First Name</div>
        <div className={classes.cell}>Last Name</div>
        <div className={classes.cell}>Email</div>
        <div className={classes.cell}>Role</div>
        {/* <div className={classes.cell}>Change</div> */}
        <div className={classes.cell}>Delete</div>
      </div>
      {users}
    </div>
  );
}

export default UserList;
