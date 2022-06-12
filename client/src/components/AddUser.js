import React, { useRef, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./AddUser.module.css";

function AddUser(props) {
  const [error, setError] = useState(false);

  const userNameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();
  const passWordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const inputFirstName = firstNameRef.current.value;
      const inputUserName = userNameRef.current.value;
      const inputLastName = lastNameRef.current.value;
      const inputEmail = emailRef.current.value;
      const inputRole = roleRef.current.value;
      const inputPassWord = passWordRef.current.value;

      if (
        inputFirstName.length < 3 ||
        inputUserName.length < 3 ||
        inputLastName.length < 3 ||
        inputEmail.length < 3 ||
        inputPassWord.length < 3
      ) {
        setError(true);
        return;
      }

      props.addUser(
        inputUserName,
        inputFirstName,
        inputLastName,
        inputEmail,
        inputRole,
        inputPassWord
      );

      props.onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const inputFirstName = firstNameRef.current.value;
  //   const inputUserName = userNameRef.current.value;
  //   const inputLastName = lastNameRef.current.value;
  //   const inputEmail = emailRef.current.value;
  //   const inputRole = roleRef.current.value;
  //   const inputPassWord = passWordRef.current.value;

  //   if (
  //     inputFirstName.length < 3 ||
  //     inputUserName.length < 3 ||
  //     inputLastName.length < 3 ||
  //     inputEmail.length < 3 ||
  //     inputPassWord.length < 3
  //   ) {
  //     setError(true);
  //   }

  //   props.onClose();
  // };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <button onClick={props.onClose} className={classes.closeButton}>
          X
        </button>
        <div className={classes.title}>New User</div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User Name"
            ref={userNameRef}
            className={classes.text}
          ></input>
          <input
            type="text"
            placeholder="First Name"
            ref={firstNameRef}
            className={classes.text}
          ></input>
          <input
            type="text"
            placeholder="Last Name"
            ref={lastNameRef}
            className={classes.text}
          ></input>
          <input
            type="email"
            placeholder="Email"
            ref={emailRef}
            className={classes.text}
          ></input>
          <div className={classes.smallContainer}>
            <input
              type="password"
              placeholder="Password"
              ref={passWordRef}
              className={classes.password}
            ></input>
            <select
              name="category"
              id="category"
              ref={roleRef}
              className={classes.category}
            >
              <option value="Student">Student</option>
              <option value="Librarian">Librarian</option>
            </select>
          </div>
          {error ? (
            <div className={classes.error}>
              Please enter all fields correctly
            </div>
          ) : (
            ""
          )}
          <button className={classes.button}>Add User</button>
        </form>
      </div>
    </Modal>
  );
}

export default AddUser;
