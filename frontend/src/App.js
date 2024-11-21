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
    <Router
        future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}
    >
      <div className="d-flex">
        <Navbar />
        <div className="flex-grow-1 p-3">
          <Routes>

              <Route path="/books" element={<BookList />}/>
              <Route path="/books/add" element={<AddBook />} />
              <Route path="/books/:bookId/update" element={<UpdateBook />} />

              <Route path="/authors" element={<AuthorList />} />
              <Route path="/authors/add" element={<AddAuthor />} />
              <Route path="/authors/:id/update" element={<UpdateAuthor />} />

              <Route path="/members" element={<MemberList />} />
              <Route path="/members/add" element={<AddMember />} />
              <Route path="/members/:id/update" element={<UpdateMember />} />

              <Route path="/borrows" element={<BorrowList />} />
              <Route path="/borrows/add" element={<AddBorrow />} />
          </Routes>
        </div>
      </div>
    </Router>
);

export default App;
