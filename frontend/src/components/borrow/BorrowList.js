import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAllBorrows,
    markAsLost,
    returnBook,
    deleteBorrow,
} from "../../services/borrowService";
import { getMemberById } from "../../services/memberService";
import { getBookById } from "../../services/bookService";

const BorrowList = () => {
    const [borrows, setBorrows] = useState([]);
    const [lostRecords, setLostRecords] = useState(() => {
        const storedLostRecords = localStorage.getItem("lostRecords");
        return storedLostRecords ? new Set(JSON.parse(storedLostRecords)) : new Set();
    });
    const [searchTerm, setSearchTerm] = useState(""); // Search input
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]); // Autocomplete suggestions

    useEffect(() => {
        fetchBorrows();
    }, []);

    useEffect(() => {
        // Update suggestions when searchTerm changes
        if (searchTerm) {
            const suggestions = borrows.filter((borrow) =>
                borrow.borrowId.toString().startsWith(searchTerm)
            );
            setAutocompleteSuggestions(suggestions);
        } else {
            setAutocompleteSuggestions([]);
        }
    }, [searchTerm, borrows]);

    const fetchBorrows = async () => {
        const data = await getAllBorrows();

        const memberPromises = data.map((borrow) => getMemberById(borrow.memberId));
        const bookPromises = data.map((borrow) => getBookById(borrow.bookId));

        const members = await Promise.all(memberPromises);
        const books = await Promise.all(bookPromises);

        data.forEach((borrow, index) => {
            borrow.memberName = members[index].memberName;
            borrow.title = books[index].title;
        });

        setBorrows(data);
    };

    const handleMarkAsLost = async (id) => {
        if (window.confirm("Are you sure you want to mark this borrow as lost?")) {
            await markAsLost(id);

            setLostRecords((prev) => {
                const updated = new Set(prev);
                updated.add(id);
                localStorage.setItem("lostRecords", JSON.stringify([...updated]));
                return updated;
            });

            await fetchBorrows();
        }
    };

    const handleReturnBook = async (id) => {
        if (window.confirm("Are you sure you want to return this book?")) {
            await returnBook(id);

            setLostRecords((prev) => {
                const updated = new Set(prev);
                updated.delete(id);
                localStorage.setItem("lostRecords", JSON.stringify([...updated]));
                return updated;
            });

            await fetchBorrows();
        }
    };

    const handleDeleteBorrow = async (id) => {
        if (window.confirm("Are you sure you want to delete this borrow record? This action cannot be undone.")) {
            await deleteBorrow(id);

            setLostRecords((prev) => {
                const updated = new Set(prev);
                updated.delete(id);
                localStorage.setItem("lostRecords", JSON.stringify([...updated]));
                return updated;
            });

            await fetchBorrows();
        }
    };

    const handleSelectSuggestion = (borrowId) => {
        setSearchTerm(borrowId.toString());
        setAutocompleteSuggestions([]);
    };

    return (
        <div className="container mt-3">
            <h2 className="d-flex justify-content-between align-items-center">
                Borrow Records
                <Link to="/borrows/add" className="btn btn-primary">
                    Add Borrow
                </Link>
            </h2>

            {/* Search Bar with Autocomplete */}
            <div className="mb-3 position-relative">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Borrow ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {autocompleteSuggestions.length > 0 && (
                    <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
                        {autocompleteSuggestions.map((borrow) => (
                            <li
                                key={borrow.borrowId}
                                className="list-group-item list-group-item-action"
                                onClick={() => handleSelectSuggestion(borrow.borrowId)}
                                style={{ cursor: "pointer" }}
                            >
                                {borrow.borrowId} - {borrow.memberName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <table className="table table-bordered table-hover mt-3">
                <thead className="thead-dark">
                <tr>
                    <th>Borrow ID</th>
                    <th>Member Name</th>
                    <th>Book Title</th>
                    <th>Borrow Date</th>
                    <th>Due Date</th>
                    <th>Return Date</th>
                    <th>Borrow Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {borrows
                    .filter((borrow) =>
                        searchTerm
                            ? borrow.borrowId.toString().includes(searchTerm)
                            : true
                    )
                    .map((borrow) => {
                        const isLost = lostRecords.has(borrow.borrowId);
                        return (
                            <tr key={borrow.borrowId}>
                                <td>{borrow.borrowId}</td>
                                <td>{borrow.memberName || "Loading..."}</td>
                                <td>{borrow.title || "Loading..."}</td>
                                <td>{new Date(borrow.borrowDate).toLocaleDateString()}</td>
                                <td>{new Date(borrow.dueDate).toLocaleDateString()}</td>
                                <td>
                                    {isLost
                                        ? "Lost"
                                        : borrow.returnDate
                                            ? new Date(borrow.returnDate).toLocaleDateString()
                                            : "Not Returned"}
                                </td>
                                <td>{borrow.borrowPrice.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-success btn-sm mr-2"
                                        onClick={() => handleReturnBook(borrow.borrowId)}
                                        disabled={!!borrow.returnDate || isLost}
                                    >
                                        Return Book
                                    </button>
                                    <button
                                        className="btn btn-warning btn-sm ms-2"
                                        onClick={() => handleMarkAsLost(borrow.borrowId)}
                                        disabled={!!borrow.returnDate || isLost}
                                    >
                                        Mark as Lost
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm ms-2"
                                        onClick={() => handleDeleteBorrow(borrow.borrowId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowList;
