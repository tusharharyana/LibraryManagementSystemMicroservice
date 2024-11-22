import React, { useState, useEffect } from "react";
import { createAuthor } from "../../services/authorService";
import { getAllBooks } from "../../services/bookService"; // Import your API function for fetching books
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField, Button } from "@mui/material";

const AddAuthor = () => {
    const [name, setName] = useState("");
    const [biography, setBiography] = useState("");
    const [selectedBooks, setSelectedBooks] = useState([]); // To store selected books
    const [books, setBooks] = useState([]); // To store all books fetched from the API
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const data = await getAllBooks(); // Assuming this fetches an array of books with `id` and `title`
            setBooks(data);
        } catch (error) {
            console.error("Failed to fetch books", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !biography) {
            setError("Name and biography are required");
            return;
        }

        const bookIds = selectedBooks.map((book) => book.bookId); // Extract IDs of selected books
        const newAuthor = { name, biography, bookIds };

        try {
            await createAuthor(newAuthor);
            navigate("/authors"); // Redirect to the authors list after successfully creating an author
        } catch (error) {
            setError("Error creating author. Please try again.");
        }
    };

    return (
        <div className="container mt-3">
            <h2>Add New Author</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Author Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="biography" className="form-label">
                        Biography
                    </label>
                    <textarea
                        id="biography"
                        className="form-control"
                        rows="4"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Books</label>
                    <Autocomplete
                        multiple
                        options={books}
                        getOptionLabel={(option) => `${option.title} (${option.bookId})`} // Show book title with ID
                        onChange={(event, value) => setSelectedBooks(value)} // Update selected books
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Select Books"
                                placeholder="Search for books"
                            />
                        )}
                    />
                    <small className="form-text text-muted">
                        Select the books this author is associated with.
                    </small>
                </div>
                <Button type="submit" variant="contained" color="primary" className="mt-3">
                    Add Author
                </Button>
            </form>
        </div>
    );
};

export default AddAuthor;
