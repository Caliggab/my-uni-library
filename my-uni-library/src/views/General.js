import React, { useState } from "react";
import AdminDashboard from "../components/AdminDashboard";
import BookList from "../components/BookList";
import BookSearch from "../components/BookSearch";
import UserList from "../components/UserList";
import BooksAdmin from "../components/BooksAdmin";

function General(props) {
  const [adminMode, setAdminMode] = useState("");

  const handleSwitch = (mode) => {
    setAdminMode(mode);
  };

  return (
    <>
      {!props.auth || props.currentUser.role === "Student" ? (
        <div>
          <BookSearch filter={props.handleFilter} />
          <BookList
            list={props.currentList}
            setUsers={props.setUsers}
            auth={props.auth}
            currentUser={props.currentUser}
            searchTerm={props.searchTerm} 
            category={props.category}
            users={props.users}
          />
        </div>
      ) : (
        ""
      )}
      {props.auth && props.currentUser.role === "Librarian" ? (
        <AdminDashboard setAdminMode={handleSwitch} />
      ) : (
        ""
      )}
      {props.auth &&
      props.currentUser.role === "Librarian" &&
      adminMode === "users" ? (
        <UserList
          users={props.users}
          currentUser={props.currentUser}
          addUser={props.addUser}
          deleteUser={props.deleteUser}
        />
      ) : props.auth &&
        props.currentUser.role === "Librarian" &&
        adminMode === "borrowed" ? (
        <BooksAdmin
          bookList={props.currentList}
          returnBook={props.returnBook}
          addBook={props.addBook}
          users={props.users}
        />
      ) : props.auth &&
        props.currentUser.role === "Librarian" &&
        adminMode === "search" ? (
        <div>
          <BookSearch filter={props.handleFilter} />
          <BookList
            list={props.currentList}
            setUsers={props.setUsers}
            auth={props.auth}
            currentUser={props.currentUser}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default General;
