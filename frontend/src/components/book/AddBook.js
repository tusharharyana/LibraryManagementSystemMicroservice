import React, { useState, useEffect } from "react";
import { createBook } from "../../services/bookService";
import { getAllAuthors } from "../../services/authorService";
import {useNavigate} from "react-router-dom";

const AddBook = () => {
    const [book, setBook] = useState({
        title: "",
        isbn: "",
        bookQuantity: 0,
        bookPrice: 0.0,
        authorIds: [],
    });

    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    // Fetch authors on component mount
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const authorList = await getAllAuthors();
                setAuthors(authorList);
            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        };
        fetchAuthors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleAuthorSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter suggestions based on search term
        if (value) {
            const filtered = authors.filter((author) =>
                author.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleAuthorSelect = (authorId, authorName) => {
        // Add selected author to the list
        if (!book.authorIds.includes(authorId)) {
            setBook({
                ...book,
                authorIds: [...book.authorIds, authorId],
            });
        }

        // Clear search and suggestions
        setSearchTerm("");
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBook(book);
            alert("Book added successfully!");
            setBook({
                title: "",
                isbn: "",
                bookQuantity: 0,
                bookPrice: 0.0,
                authorIds: [],
            });
        } catch (error) {
            alert("Failed to add the book. Please try again.");
            console.error("Error adding book:", error);
        }
        navigate("/books");
    };

    return (
        <div className="container mt-3">
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        name="isbn"
                        value={book.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        name="bookQuantity"
                        value={book.bookQuantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="bookPrice"
                        value={book.bookPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Authors</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search authors by name"
                        value={searchTerm}
                        onChange={handleAuthorSearch}
                    />
                    {suggestions.length > 0 && (
                        <ul className="list-group mt-2">
                            {suggestions.map((author) => (
                                <li
                                    key={author.id}
                                    className="list-group-item list-group-item-action"
                                    onClick={() => handleAuthorSelect(author.id, author.name)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {author.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="form-group">
                    <strong>Selected Authors:</strong>
                    {book.authorIds.length > 0 && (
                        <ul className="mt-2">
                            {book.authorIds.map((authorId) => {
                                const author = authors.find((a) => a.id === authorId);
                                return (
                                    <li key={authorId}>
                                        {author?.name || `Author ID: ${authorId}`}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
