import React from "react";
import { FaBookOpen, FaSearch, FaUserEdit } from "react-icons/fa";
import classes from "./AdminDashboard.module.css";

function AdminDashboard(props) {
  const onSwitchtoUser = () => {
    props.setAdminMode("users");
  };

  const onSwitchtoBorrowed = () => {
    props.setAdminMode("borrowed");
  };

  const onSwitchtoSearch = () => {
    props.setAdminMode("search");
  };

  return (
    <div className={classes.container}>
      <div>Admin Dashboard</div>
      <div className={classes.buttonBox}>
        <button className={classes.button} onClick={onSwitchtoUser}>
          <FaUserEdit className={classes.icon} />
          Users
        </button>
        <button className={classes.button} onClick={onSwitchtoBorrowed}>
          <FaBookOpen className={classes.icon} />
          Books
        </button>
        <button className={classes.button} onClick={onSwitchtoSearch}>
          <FaSearch className={classes.icon} />
          Search
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
