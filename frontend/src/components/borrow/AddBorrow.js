import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBorrow } from "../../services/borrowService";

const AddBorrow = () => {
    const [memberId, setMemberId] = useState("");
    const [bookId, setBookId] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const borrowRequest = { memberId, bookId };
        await createBorrow(borrowRequest);
        navigate("/borrows");
    };

    return (
        <div className="container mt-3">
            <h2>Add Borrow</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Member ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Book ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Add Borrow
                </button>
            </form>
        </div>
    );
};

export default AddBorrow;
