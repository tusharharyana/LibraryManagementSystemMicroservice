import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBorrow } from "../../services/borrowService";
import { getAllMembers } from "../../services/memberService";
import { getAllBooks } from "../../services/bookService";
import { TextField, Autocomplete, Button } from "@mui/material";

const AddBorrow = () => {
    const [members, setMembers] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMembers();
        fetchBooks();
    }, []);

    const fetchMembers = async () => {
        const data = await getAllMembers();
        setMembers(data);
    };

    const fetchBooks = async () => {
        const data = await getAllBooks();
        setBooks(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedMember || !selectedBook) {
            alert("Please select both a member and a book!");
            return;
        }
        const borrowRequest = {
            memberId: selectedMember.memberId,
            bookId: selectedBook.bookId,
        };
        await createBorrow(borrowRequest);
        navigate("/borrows");
    };

    return (
        <div className="container mt-3">
            <h2>Add Borrow</h2>
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
