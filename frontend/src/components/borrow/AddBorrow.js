import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBorrow } from "../../services/borrowService";
import { getAllMembers } from "../../services/memberService";
import { getAllBooks } from "../../services/bookService";
import { TextField, Autocomplete, Button, Alert } from "@mui/material";

const AddBorrow = () => {
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [error, setError] = useState(null); // To display error messages
    const navigate = useNavigate();

    useEffect(() => {
        fetchMembers();
        fetchBooks();
    }, []);

    const fetchMembers = async () => {
        try {
            const data = await getAllMembers();
            setMembers(data);
        } catch (err) {
            setError("Failed to fetch members. Please try again later.");
        }
    };

    const fetchBooks = async () => {
        try {
            const data = await getAllBooks();
            setBooks(data);
        } catch (err) {
            setError("Failed to fetch books. Please try again later.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        if (!selectedMember || !selectedBook) {
            setError("Please select both a member and a book!");
            return;
        }
        const borrowRequest = {
            memberId: selectedMember.memberId,
            bookId: selectedBook.bookId,
        };
        try {
            await createBorrow(borrowRequest);
            navigate("/borrows");
        } catch (err) {
            // Check for specific status or display a generic error message
            if (err.response && err.response.status === 500) {
                setError("Server error! Unable to process the request. Please try again later.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="container mt-3">
            <h2>Add Borrow</h2>
            {error && (
                <Alert severity="error" className="mb-3">
                    {error}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <Autocomplete
                        options={members}
                        getOptionLabel={(option) => `${option.memberName} (${option.memberId})`}
                        onChange={(event, value) => setSelectedMember(value)}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Member" variant="outlined" fullWidth />
                        )}
                    />
                </div>
                <div className="form-group mt-3">
                    <Autocomplete
                        options={books}
                        getOptionLabel={(option) => `${option.title} (${option.bookId})`}
                        onChange={(event, value) => setSelectedBook(value)}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Book" variant="outlined" fullWidth />
                        )}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary" className="mt-3">
                    Add Borrow
                </Button>
            </form>
        </div>
    );
};

export default AddBorrow;
