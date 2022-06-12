import React, { useState } from "react";
import classes from "./navbar.module.css";
import { FaUserAlt, FaUserTie } from "react-icons/fa";
import LogIn from "../components/LogIn";
import BorrowedBooks from "../components/BorrowedBooks";

function Navbar(props) {
  const [logInModal, setLogInModal] = useState(false);
  const [booksModal, setBooksModal] = useState(false);

  const closeModalHandler = () => {
    setLogInModal(false);
  };

  const openModalHandler = () => {
    setLogInModal(true);
  };

  const openBooksHandler = () => {
    props.getBooks();
    props.getUsers();
    setBooksModal(true);
  };

  const closeBooksHandler = () => {
    setBooksModal(false);
  };

  return (
    <>
      <nav className={classes.navbar}>
        <div>My Uni Library</div>
        <div className={classes.userBox}>
          {props.auth ? (
            <div>
              Hello {props.currentUser.firstname}!{" "}
              {props.currentUser.role === "Student" ? (
                <FaUserAlt />
              ) : (
                <FaUserTie />
              )}{" "}
            </div>
          ) : (
            <div>Hello Guest!</div>
          )}

          {props.auth && props.currentUser.role === "Student" ? (
            <div>
              <button
                className={`${classes.button} ${classes.logOutButton}`}
                onClick={props.toggleAuth}
              >
                Log Out
              </button>
              <button
                className={`${classes.button} ${classes.booksButton}`}
                onClick={openBooksHandler}
              >
                Your Books
              </button>
              {booksModal ? (
                <BorrowedBooks
                  onClose={closeBooksHandler}
                  userBooks={props.currentUser}
                  currentList={props.currentList}
                  getBooks={props.getBooks}
                  getUsers={props.getUsers}
                  currentUser={props.currentUser}
                  users={props.users}
                />
              ) : (
                ""
              )}
            </div>
          ) : props.auth && props.currentUser.role === "Librarian" ? (
            <button
              className={`${classes.button} ${classes.logOutButton}`}
              onClick={props.toggleAuth}
            >
              Log Out
            </button>
          ) : (
            <button
              className={`${classes.button} ${classes.logInButton}`}
              onClick={openModalHandler}
            >
              Log In
            </button>
          )}

          {logInModal ? (
            <LogIn
              close={closeModalHandler}
              users={props.users}
              login={props.login}
              logout={props.logout}
              setCurrentUser={props.setCurrentUser}
            />
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
