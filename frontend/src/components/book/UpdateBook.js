import React, { useEffect, useState } from "react";
import { getBookById, updateBook } from "../../services/bookService";
import { getAllAuthors } from "../../services/authorService";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [allAuthors, setAllAuthors] = useState([]); // All authors fetched from the server
    const [updatedBook, setUpdatedBook] = useState({
        title: "",
        isbn: "",
        bookQuantity: "",
        bookPrice: "",
        authorIds: [], // For storing selected author ids
    });
    const [searchTerm, setSearchTerm] = useState(""); // Search query for authors
    const [suggestions, setSuggestions] = useState([]); // Suggestions for authors based on search term
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookAndAuthors();
    }, [bookId]);

    const fetchBookAndAuthors = async () => {
        // Fetch the book details
        const bookData = await getBookById(bookId);
        setBook(bookData);
        setUpdatedBook({
            title: bookData.title,
            isbn: bookData.isbn,
            bookQuantity: bookData.bookQuantity,
            bookPrice: bookData.bookPrice,
            authorIds: bookData.authorIds,
        });

        // Fetch all authors
        const authorsData = await getAllAuthors();
        setAllAuthors(authorsData);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter authors based on search term
        if (value) {
            const filteredAuthors = allAuthors.filter((author) =>
                author.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredAuthors);
        } else {
            setSuggestions([]);
        }
    };

    const handleAuthorSelect = (authorId) => {
        // Add selected author to the list if not already selected
        if (!updatedBook.authorIds.includes(authorId)) {
            setUpdatedBook({
                ...updatedBook,
                authorIds: [...updatedBook.authorIds, authorId],
            });
        }

        // Clear search and suggestions
        setSearchTerm("");
        setSuggestions([]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateBook(bookId, updatedBook); // Update the book
        navigate("/books"); // Redirect to the book list page after update
    };

    return (
        <div className="container mt-3">
            <h2>Update Book</h2>
            {book && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={updatedBook.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label">ISBN</label>
                        <input
                            type="text"
                            className="form-control"
                            id="isbn"
                            name="isbn"
                            value={updatedBook.isbn}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bookQuantity" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="bookQuantity"
                            name="bookQuantity"
                            value={updatedBook.bookQuantity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bookPrice" className="form-label">Price (Rs)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="bookPrice"
                            name="bookPrice"
                            value={updatedBook.bookPrice}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="authors" className="form-label">Authors</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search authors by name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        {suggestions.length > 0 && (
                            <ul className="list-group mt-2">
                                {suggestions.map((author) => (
                                    <li
                                        key={author.id}
                                        className="list-group-item list-group-item-action"
                                        onClick={() => handleAuthorSelect(author.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {author.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Display selected authors */}
                        <div className="mt-3">
                            <h5>Selected Authors:</h5>
                            {updatedBook.authorIds.length > 0 && (
                                <ul className="mt-2">
                                    {updatedBook.authorIds.map((authorId) => {
                                        const author = allAuthors.find((a) => a.id === authorId);
                                        return (
                                            <li key={authorId}>
                                                {author?.name || `Author ID: ${authorId}`}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Update Book
                    </button>
                </form>
            )}
        </div>
    );
};

export default UpdateBook;
