import React, { useEffect, useState } from "react";
import { getBookById, updateBook } from "../../services/bookService";
import { getAuthorsByIds } from "../../services/authorService";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [updatedBook, setUpdatedBook] = useState({
        title: "",
        isbn: "",
        bookQuantity: "",
        bookPrice: "",
        authorIds: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchBookData().then(r => "");
    }, []);

    const fetchBookData = async () => {
        const data = await getBookById(bookId);
        setBook(data);
        setUpdatedBook({
            title: data.title,
            isbn: data.isbn,
            bookQuantity: data.bookQuantity,
            bookPrice: data.bookPrice,
            authorIds: data.authorIds,
        });

        // Fetch authors for the selected book
        const authorsData = await getAuthorsByIds(data.authorIds);
        setAuthors(authorsData);
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
        navigate("/"); // Redirect to book list after update
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
                        <select
                            multiple
                            className="form-control"
                            id="authors"
                            name="authorIds"
                            value={updatedBook.authorIds}
                            onChange={handleChange}
                        >
                            {authors.map((author) => (
                                <option key={author.authorId} value={author.authorId}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
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
