import React, { useEffect, useState } from "react";
import { deleteBook, getAllBooks } from "../../services/bookService";
import { getAuthorsByIds } from "../../services/authorService";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        fetchBooks().then(() => {});
    }, []);

    const fetchBooks = async () => {
        const data = await getAllBooks();
        console.log("Fetched books:", data);
        for (let book of data) {
            book.authors = await getAuthorsByIds(book.authorIds);
        }
        setBooks(data);
        setFilteredBooks(data);
    };


    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(value)
        );
        setFilteredBooks(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            await deleteBook(id);
            await fetchBooks();
        }
    };

    return (
        <div className="container mt-3">
            <h2 className="d-flex justify-content-between align-items-center">
                Books
                <Link to="/books/add" className="btn btn-primary">
                    Add Book
                </Link>
            </h2>

            <TextField
                label="Search by Title"
                variant="outlined"
                fullWidth
                className="my-3"
                value={searchTerm}
                onChange={handleSearch}
            />

            <table className="table table-bordered table-hover mt-3">
                <thead className="thead-dark">
                <tr>
                    <th>Title</th>
                    <th>ISBN</th>
                    <th>Quantity</th>
                    <th>Price (Rs)</th>
                    <th>Authors</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map((book) => (
                    <tr key={book.bookId}>
                        <td>{book.title}</td>
                        <td>{book.isbn}</td>
                        <td>{book.bookQuantity}</td>
                        <td>{book.bookPrice}</td>
                        <td>
                            {book.authors && book.authors.length > 0
                                ? book.authors.map((author, index) => (
                                    <span key={index}>
                        {author.name}
                                        {index < book.authors.length - 1 && ", "}
                      </span>
                                ))
                                : "No authors"}
                        </td>
                        <td>
                            <Link
                                to={`/books/${book.bookId}/update`}
                                className="btn btn-info btn-sm mr-2"
                            >
                                Update
                            </Link>
                            <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() => handleDelete(book.bookId)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
