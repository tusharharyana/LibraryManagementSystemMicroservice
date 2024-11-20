import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBorrows, markAsLost, returnBook } from "../../services/borrowService";

const BorrowList = () => {
    const [borrows, setBorrows] = useState([]);

    useEffect(() => {
        fetchBorrows().then(r => "");
    }, []);

    const fetchBorrows = async () => {
        const data = await getAllBorrows();
        setBorrows(data);
    };

    const handleMarkAsLost = async (id) => {
        if (window.confirm("Are you sure you want to mark this borrow as lost?")) {
            await markAsLost(id);
            fetchBorrows();
        }
    };

    const handleReturnBook = async (id) => {
        if (window.confirm("Are you sure you want to return this book?")) {
            await returnBook(id);
            fetchBorrows();
        }
    };

    return (
        <div className="container mt-3">
            <h2 className="d-flex justify-content-between align-items-center">
                Borrow Records
                <Link to="/borrows/add-borrow" className="btn btn-primary">
                    Add Borrow
                </Link>
            </h2>
            <table className="table table-bordered table-hover mt-3">
                <thead className="thead-dark">
                <tr>
                    <th>Borrow ID</th>
                    <th>Member ID</th>
                    <th>Book ID</th>
                    <th>Borrow Date</th>
                    <th>Due Date</th>
                    <th>Return Date</th>
                    <th>Borrow Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {borrows.map((borrow) => (
                    <tr key={borrow.borrowId}>
                        <td>{borrow.borrowId}</td>
                        <td>{borrow.memberId}</td>
                        <td>{borrow.bookId}</td>
                        <td>{new Date(borrow.borrowDate).toLocaleDateString()}</td>
                        <td>{new Date(borrow.dueDate).toLocaleDateString()}</td>
                        <td>
                            {borrow.returnDate
                                ? new Date(borrow.returnDate).toLocaleDateString()
                                : "Not Returned"}
                        </td>
                        <td>{borrow.borrowPrice.toFixed(2)}</td>
                        <td>
                            <button
                                className="btn btn-success btn-sm mr-2"
                                onClick={() => handleReturnBook(borrow.borrowId)}
                                disabled={!!borrow.returnDate}
                            >
                                Return Book
                            </button>
                            <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() => handleMarkAsLost(borrow.borrowId)}
                                disabled={!!borrow.returnDate}
                            >
                                Mark as Lost
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowList;
