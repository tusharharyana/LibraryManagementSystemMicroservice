import React, { useState } from "react";
import { createBook } from "../../services/bookService";

const AddBook = () => {
    const [book, setBook] = useState({
        title: "",
        isbn: "",
        bookQuantity: 0,
        bookPrice: 0.0,
        authorIds: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createBook(book);
        alert("Book added successfully!");
        setBook({ title: "", isbn: "", bookQuantity: 0, bookPrice: 0.0, authorIds: [] });
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
                <button type="submit" className="btn btn-primary mt-3">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
