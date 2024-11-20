import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookList from "./components/book/BookList";
import AddBook from "./components/book/AddBook";
import UpdateBook from "./components/book/UpdateBook";
import AuthorList from "./components/author/AuthorList";
import AddAuthor from "./components/author/AddAuthor";
import UpdateAuthor from "./components/author/UpdateAuthor";
import MemberList from "./components/member/MemberList";
import AddMember from "./components/member/AddMember";
import UpdateMember from "./components/member/UpdateMember";
import AddBorrow from "./components/borrow/AddBorrow";
import BorrowList from "./components/borrow/BorrowList";

const App = () => (
    <Router>
      <div className="d-flex">
        <Navbar />
        <div className="flex-grow-1 p-3">
          <Routes>

              <Route path="/books" element={<BookList />} />
              <Route path="/books/add-books" element={<AddBook />} />
              <Route path="/books/update-book/:bookId" element={<UpdateBook />} />

              <Route path="/authors" element={<AuthorList />} />
              <Route path="/authors/add-author" element={<AddAuthor />} />
              <Route path="/authors/update-author/:id" element={<UpdateAuthor />} />

              <Route path="/members" element={<MemberList />} />
              <Route path="/members/add-member" element={<AddMember />} />
              <Route path="/members/update-member/:id" element={<UpdateMember />} />

              <Route path="/borrows" element={<BorrowList />} />
              <Route path="/borrows/add-borrow" element={<AddBorrow />} />
          </Routes>
        </div>
      </div>
    </Router>
);

export default App;
