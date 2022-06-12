const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");

//

//middleware
app.use(cors());
app.use(express.json()); // => allows us to access the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build")); => for demonstration

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

//-------Routes-----//

//USERS routes
//Create a user POST

app.post("/users", async (req, res) => {
  try {
    const { username, firstname, lastname, email, role, password, borrowed } =
      req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, firstname, lastname, email, role, password, borrowed) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [username, firstname, lastname, email, role, password, borrowed]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//GET all users

app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//GET single user

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//MODIFY user

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { borrowed } = req.body;
    const updateUser = await pool.query(
      "UPDATE users SET borrowed = $1 WHERE user_id = $2",
      [borrowed, id]
    );

    res.json("user updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE a single user

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id]
    );

    res.json("user deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

//BOOKS routes
//Create a book (POST)

app.post("/books", async (req, res) => {
  try {
    const { title, author, published_year, genre, image, stock, borrowed_by } =
      req.body;
    const newUser = await pool.query(
      "INSERT INTO books (title, author, published_year, genre, image, stock, borrowed_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, author, published_year, genre, image, stock, borrowed_by]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//GET all books

app.get("/books", async (req, res) => {
  try {
    const allBooks = await pool.query("SELECT * FROM books");

    res.json(allBooks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//GET a single book

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM books WHERE book_id = $1", [
      id,
    ]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//MODIFY book

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { borrowed_by, stock } = req.body;

    const updateBookBorrowedBy = await pool.query(
      "UPDATE books SET borrowed_by = $1 WHERE book_id = $2",
      [borrowed_by, id]
    );

    const updateBookStock = await pool.query(
      "UPDATE books SET stock = $1 WHERE book_id = $2",
      [stock, id]
    );

    res.json("book updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE book

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await pool.query(
      "DELETE FROM books WHERE book_id = $1",
      [id]
    );

    res.json("book deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
