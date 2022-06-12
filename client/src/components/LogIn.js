import React, { useRef, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./LogIn.module.css";

function LogIn(props) {
  const [error, setError] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const users = props.users;

  const handleLogin = (e) => {
    e.preventDefault();
    let inputUsername = usernameRef.current.value;
    let inputPassword = passwordRef.current.value;

    users.forEach((user) => {
      if (inputUsername.length < 3 || inputPassword.length < 3) {
        setInvalid(true);
        setError(false);
        return;
      }
      if (inputUsername === user.username && inputPassword === user.password) {
        props.login();
        props.setCurrentUser({ user });
        props.close();
      } else {
        setError(true);
        setInvalid(false);
      }
    });
  };

  return (
    <Modal onClose={props.close}>
      <div className={classes.container}>
        <div className={classes.title}>
          Access your account to borrow books!
        </div>
        <form onSubmit={handleLogin} className={classes.form}>
          <input
            type="text"
            placeholder="User Name"
            ref={usernameRef}
            className={classes.input}
          ></input>
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className={classes.input}
          ></input>

          <button className={classes.logInButton}>Login</button>
        </form>
        {error ? (
          <div className={classes.error}>
            Sorry! check your info and try again.
            If you don't have an account ask your librarian for help.
          </div>
        ) : (
          ""
        )}
        {invalid ? (
          <div className={classes.error}>Sorry! Fields should be longer.</div>
        ) : (
          ""
        )}

        <button onClick={props.close} className={classes.closeButton}>
          X
        </button>
      </div>
    </Modal>
  );
}

export default LogIn;
