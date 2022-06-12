import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import General from "./views/General";

function App() {
  const [auth, setAuth] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentList, setCurrentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [category, setCategory] = useState(null);

  // useEffect(() => {
  //   if (localStorage.user) {
  //     handleLogin();
  //     setCurrentUser(JSON.parse(localStorage.user).user);
  //   }
  // }, []);

  //get User List

  const getUsers = async () => {
    try {
      const response = await fetch("/users");
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //get Book list

  const getBooks = async () => {
    try {
      const response = await fetch("/books");
      const jsonData = await response.json();

      setCurrentList(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
    getUsers();
  }, []);

  const handleFilter = async (searchTerm, category) => {
    setSearchTerm(searchTerm);
    setCategory(category);
  };

  const handleToggleAuth = () => {
    localStorage.clear();
    setCurrentUser({});
    setAuth(!auth);
  };

  const handleLogin = () => {
    setAuth(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false);
  };

  const handleSetCurrentUser = (user) => {
    setCurrentUser(user.user);
  };

  const borrowBookHandler = async (newBook, userId) => {
    try {
      const foundBook = await fetch(`/books/${newBook.book_id}`);
      const bookJsonData = await foundBook.json();

      const foundUser = await fetch(`/users/${userId}`);
      const userJsonData = await foundUser.json();

      let body =
        userJsonData.borrowed.length !== 0
          ? [...userJsonData.borrowed, bookJsonData.book_id]
          : [bookJsonData.book_id];

      //update user's BORROWED field

      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrowed: body }),
      });

      // const userJsonResponse = await response.json();

      let borrowedBy =
        bookJsonData.borrowed_by.length !== 0
          ? [...bookJsonData.borrowed_by, userId]
          : [userId];

      // update book's STOCK and BORROWED_BY

      const secondResponse = await fetch(`/books/${bookJsonData.book_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          borrowed_by: borrowedBy,
          stock: bookJsonData.stock - 1,
        }),
      });
      getBooks();
      getUsers();
      // const bookJsonResponse = await response.json();
    } catch (error) {
      console.error(error.message);
    }

    // users.map((user) => {
    //   if (user.username === currentUser.username) {
    //     user.borrowed.push(newBook);
    //     newUserList.push(user);
    //     setCurrentUser(user);
    //   } else {
    //     newUserList.push(user);
    //   }
    // });

    // currentList.map((book) => {
    //   if (newBook.id === book.id) {
    //     let borrowingUser = users.filter((user) => user.id === userId)[0];
    //     // let borrowedBy = [];
    //     // book.borrowedBy.forEach((user) => {
    //     //   borrowedBy.push([user]);
    //     // });

    //     book.borrowedBy.push(borrowingUser);

    //     // if (book.borrowedBy.length > 0) {
    //     //   borrowedBy = [...book.borrowedBy, user]
    //     // } else {
    //     //   borrowedBy.push(user);
    //     // }

    //     newBookList.push({
    //       ...book,
    //       stock: book.stock - 1,
    //       borrowedBy: book.borrowedBy,
    //     });
    //   } else {
    //     newBookList.push(book);
    //   }
    // });
    // setUsers(newUserList);
    // setCurrentList(newBookList);
  };

  const addUserHandler = async (
    inputUserName,
    inputFirstName,
    inputLastName,
    inputEmail,
    inputRole,
    inputPassWord
  ) => {
    const response = await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: inputUserName,
        firstname: inputFirstName,
        lastname: inputLastName,
        email: inputEmail,
        role: inputRole,
        password: inputPassWord,
        borrowed: [],
      }),
    });

    const jsonData = await response.json();

    getUsers();
  };

  const deleteUserHandler = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, {
        method: "DELETE",
      });

      getUsers();
    } catch (error) {
      console.error(error.message);
    }
  };

  const returnBookHandler = async (bookId, userId) => {
    try {
      const foundBook = await fetch(`/books/${bookId}`);
      const bookJsonData = await foundBook.json();

      const foundUser = await fetch(`/users/${userId}`);
      const userJsonData = await foundUser.json();

      //delete book from users's borrowed
      const index = userJsonData.borrowed.indexOf(bookId);
      let newBorrowed = userJsonData.borrowed;

      let removed = userJsonData.borrowed.splice(index);

      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ borrowed: newBorrowed }),
      });

      const userJsonResponse = await response.json();

      //modify BorrowedBY in book  and increase Book Stock

      const secondindex = bookJsonData.borrowed_by.indexOf(userId);
      let newBorrowedBy = bookJsonData.borrowed_by;

      let secondRemoved = bookJsonData.borrowed_by.splice(secondindex);

      const secondResponse = await fetch(`/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          borrowed_by: newBorrowedBy,
          stock: bookJsonData.stock + 1,
        }),
      });

      getBooks();
      getUsers();
    } catch (error) {
      console.error(error.message);
    }

    // let newBooklist = [];
    // let newUserList = [];
    // //delete book from borrowed in user
    // let foundUser = users.filter((user) => user.id === userId)[0];
    // console.log(foundUser);
    // let newBorrowed = foundUser.borrowed.filter((book) => book.id !== bookId);
    // let newUser = {
    //   id: foundUser.id,
    //   username: foundUser.username,
    //   firstName: foundUser.firstName,
    //   lastName: foundUser.lastName,
    //   email: foundUser.email,
    //   role: foundUser.role,
    //   password: foundUser.password,
    //   borrowed: newBorrowed,
    // };

    // users.map((user) => {
    //   if (user.id === userId) {
    //     newUserList.push(newUser);
    //   } else {
    //     newUserList.push(user);
    //   }
    // });

    // //increase stock AND modify borrowedBy in book
    // let foundBook = currentList.filter((book) => book.id === bookId)[0];
    // let newBorrowedBy = foundBook.borrowedBy.filter(
    //   (user) => user.id !== userId
    // );

    // let newBook = {
    //   id: foundBook.id,
    //   title: foundBook.title,
    //   author: foundBook.author,
    //   published_year: foundBook.published_year,
    //   genre: foundBook.genre,
    //   image: foundBook.image,
    //   stock: foundBook.stock + 1,
    //   borrowedBy: newBorrowedBy,
    // };

    // currentList.map((book) => {
    //   if (book.id === bookId) {
    //     newBooklist.push(newBook);
    //   } else {
    //     newBooklist.push(book);
    //   }
    // });

    // setCurrentList(newBooklist);
    // setUsers(newUserList);
  };

  const newBookHandler = async (
    inputTitle,
    inputAuthor,
    inputPublishedYear,
    inputGenre,
    inputImgUrl,
    inputStock
  ) => {
    const response = await fetch("/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: inputTitle,
        author: inputAuthor,
        published_year: inputPublishedYear,
        genre: inputGenre,
        image: inputImgUrl,
        stock: inputStock,
        borrowed_by: [],
      }),
    });

    const jsonData = await response.json();

    getBooks();
  };

  return (
    <>
      <Navbar
        auth={auth}
        toggleAuth={handleToggleAuth}
        login={handleLogin}
        logout={handleLogout}
        users={users}
        currentUser={currentUser}
        currentList={currentList}
        setCurrentUser={handleSetCurrentUser}
        getBooks={getBooks}
        getUsers={getUsers}
      />
      <General
        auth={auth}
        users={users}
        setUsers={borrowBookHandler}
        addUser={addUserHandler}
        currentUser={currentUser}
        currentList={currentList}
        handleFilter={handleFilter}
        deleteUser={deleteUserHandler}
        returnBook={returnBookHandler}
        addBook={newBookHandler}
        searchTerm={searchTerm}
        category={category}
      />
      <Footer />
    </>
  );
}

export default App;
