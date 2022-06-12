import React, { useRef } from "react";
import classes from "./bookSearch.module.css";

function BookSearch(props) {
  const searchRef = useRef();
  const categoryRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchRef.current.value;
    const category = categoryRef.current.value;

    props.filter(searchTerm, category);
  };

  return (
    <div className={classes.container}>
      <div>Search in our Library:</div>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your search query"
          ref={searchRef}
          className={classes.query}
        ></input>
        <select name="category" id="category" ref={categoryRef} className={classes.category}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>
        <button className={classes.button}>Search</button>
      </form>
    </div>
  );
}

export default BookSearch;
