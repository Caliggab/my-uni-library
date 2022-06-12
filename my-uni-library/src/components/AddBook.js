import React, { useRef, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./AddBook.module.css";

function AddBook(props) {
    const [error, setError] = useState(false);

  const titleRef = useRef();
  const authorRef = useRef();
  const publishedYearRef = useRef();
  const genreRef = useRef();
  const imgUrlRef = useRef();
  const stockRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputAuthor = authorRef.current.value;
    const inputTitle = titleRef.current.value;
    const inputpublishedYear = publishedYearRef.current.value;
    const inputgenre = genreRef.current.value;
    const inputimgUrl = imgUrlRef.current.value;
    const inputstock = stockRef.current.value;

    if (
      inputAuthor.length < 3 ||
      inputTitle.length < 3 ||
      inputpublishedYear.length < 3 ||
      inputgenre.length < 3 ||
      inputstock.length < 0
    ) {
      setError(true);
    }

    props.addBook(
      inputTitle,
      inputAuthor,
      inputpublishedYear,
      inputgenre,
      inputimgUrl,
      inputstock
    );
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <button onClick={props.onClose} className={classes.closeButton}>
          X
        </button>
        <div className={classes.title}>New Book</div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            ref={titleRef}
            className={classes.text}
          ></input>
          <input
            type="text"
            placeholder="Author"
            ref={authorRef}
            className={classes.text}
          ></input>
          <input
            type="number"
            placeholder="Published Year"
            ref={publishedYearRef}
            className={classes.text}
          ></input>
          <input
            type="text"
            placeholder="Genre"
            ref={genreRef}
            className={classes.text}
          ></input>
          <input
            type="text"
            placeholder="Image URL"
            ref={imgUrlRef}
            className={classes.text}
          ></input>
            <input
              type="number"
              placeholder="Stock"
              ref={stockRef}
              className={classes.text}
            ></input>
          {error ? (
            <div className={classes.error}>
              Please enter all fields correctly
            </div>
          ) : (
            ""
          )}
          <button className={classes.button}>Add Book</button>
        </form>
      </div>
    </Modal>
  );
}

export default AddBook;
