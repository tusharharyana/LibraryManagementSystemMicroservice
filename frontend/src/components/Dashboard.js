import React, { useState, useEffect } from "react";
import { getAllBooks } from "../services/bookService";
import { getAllAuthors } from "../services/authorService";
import { getAllMembers } from "../services/memberService";
import { getAllBorrows } from "../services/borrowService";

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [members, setMembers] = useState([]);
    const [borrows, setBorrows] = useState([]);
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        fetchOverviewData();
    }, []);

    const fetchOverviewData = async () => {
        const booksData = await getAllBooks();
        const authorsData = await getAllAuthors();
        const membersData = await getAllMembers();
        const borrowsData = await getAllBorrows();

        setBooks(booksData);
        setAuthors(authorsData);
        setMembers(membersData);
        setBorrows(borrowsData);
    };

    const handleCardClick = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Dashboard</h1>

            {/* Cards for Book, Author, Member, and Borrow Counts */}
            <div className="row mt-4">
                {/* Total Books */}
                <div className="col-md-3">
                    <div
                        className="card text-white bg-primary mb-4 card-hover"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCardClick("books")}
                    >
                        <div className="card-body">
                            <h5 className="card-title">Total Books</h5>
                            <p className="card-text">{books.length}</p>
                        </div>
                    </div>
                </div>

                {/* Total Authors */}
                <div className="col-md-3">
                    <div
                        className="card text-white bg-secondary mb-4 card-hover"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCardClick("authors")}
                    >
                        <div className="card-body">
                            <h5 className="card-title">Total Authors</h5>
                            <p className="card-text">{authors.length}</p>
                        </div>
                    </div>
                </div>

                {/* Total Members */}
                <div className="col-md-3">
                    <div
                        className="card text-white bg-success mb-4 card-hover"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCardClick("members")}
                    >
                        <div className="card-body">
                            <h5 className="card-title">Total Members</h5>
                            <p className="card-text">{members.length}</p>
                        </div>
                    </div>
                </div>

                {/* Total Borrow Records */}
                <div className="col-md-3">
                    <div
                        className="card text-white bg-danger mb-4 card-hover"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCardClick("borrows")}
                    >
                        <div className="card-body">
                            <h5 className="card-title">Total Borrow Records</h5>
                            <p className="card-text">{borrows.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditional render of sections based on clicked card */}
            {activeSection === "books" && (
                <div className="mt-4">
                    <h3 className="text-primary">Books Overview</h3>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Book Title</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.slice(0, 5).map((book) => (
                            <tr key={book.bookId}>
                                <td>{book.title}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeSection === "authors" && (
                <div className="mt-4">
                    <h3 className="text-secondary">Authors Overview</h3>
                    <ul className="list-group">
                        {authors.slice(0, 5).map((author) => (
                            <li key={author.authorId} className="list-group-item">
                                {author.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {activeSection === "members" && (
                <div className="mt-4">
                    <h3 className="text-success">Members Overview</h3>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Member Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members.slice(0, 5).map((member) => (
                            <tr key={member.memberId}>
                                <td>{member.memberName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeSection === "borrows" && (
                <div className="mt-4">
                    <h3 className="text-danger">Borrow Records Overview</h3>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Borrow ID</th>
                            <th>Borrow Date</th>
                            <th>Due Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {borrows.slice(0, 5).map((borrow) => (
                            <tr key={borrow.borrowId}>
                                <td>{borrow.borrowId}</td>
                                <td>{new Date(borrow.borrowDate).toLocaleDateString()}</td>
                                <td>{new Date(borrow.dueDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
