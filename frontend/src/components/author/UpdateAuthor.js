import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthorById, updateAuthor } from "../../services/authorService";
import { getAllBooks } from "../../services/bookService"; // Import the book service to fetch books

const UpdateAuthor = () => {
    const [author, setAuthor] = useState(null);
    const [name, setName] = useState("");
    const [biography, setBiography] = useState("");
    const [bookIds, setBookIds] = useState("");
    const [error, setError] = useState("");
    const [books, setBooks] = useState([]); // List of all books
    const [suggestions, setSuggestions] = useState([]); // Filtered book suggestions
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchAuthor();
        fetchBooks();
    }, [id]);

    // Fetch author details
    const fetchAuthor = async () => {
        try {
            const data = await getAuthorById(id);
            setAuthor(data);
            setName(data.name);
            setBiography(data.biography);
            setBookIds(data.bookIds.join(", "));
        } catch (error) {
            setError("Error fetching author details.");
        }
    };

    // Fetch books for suggestions
    const fetchBooks = async () => {
        try {
            const data = await getAllBooks(); // Fetch books from your database
            setBooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    // Handle book search
    const handleBookSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter books based on search term
        if (value) {
            const filtered = books.filter((book) =>
                book.title.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    // Handle book selection
    const handleBookSelect = (bookId, bookTitle) => {
        const currentIds = bookIds.split(",").map((id) => id.trim());
        if (!currentIds.includes(bookId)) {
            setBookIds([...currentIds, bookId].join(", "));
        }

        // Clear search and suggestions
        setSearchTerm("");
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !biography) {
            setError("Name and biography are required");
            return;
        }

        const updatedAuthor = {
            name,
            biography,
            bookIds: bookIds.split(",").map((id) => id.trim()),
        };

        try {
            await updateAuthor(id, updatedAuthor);
            navigate("/authors");
        } catch (error) {
            setError("Error updating author. Please try again.");
        }
    };

    return (
        <div className="container mt-3">
            <h2>Update Author</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {author ? (
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
                        <label htmlFor="bookIds" className="form-label">
                            Associated Books
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search books by title"
                            value={searchTerm}
                            onChange={handleBookSearch}
                        />
                        {suggestions.length > 0 && (
                            <ul className="list-group mt-2">
                                {suggestions.map((book) => (
                                    <li
                                        key={book.id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => handleBookSelect(book.bookId, book.title)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {book.title} (ID: {book.bookId})
                                    </li>
                                ))}
                            </ul>
                        )}
                        <small className="form-text text-muted">
                            Selected Book IDs (comma-separated):
                        </small>
                        <input
                            type="text"
                            id="bookIds"
                            className="form-control mt-2"
                            value={bookIds}
                            onChange={(e) => setBookIds(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update Author
                    </button>
                </form>
            ) : (
                <div>Loading author details...</div>
            )}
        </div>
    );
};

export default UpdateAuthor;
