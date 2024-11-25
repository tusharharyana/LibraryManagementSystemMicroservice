import React, { useEffect, useState } from "react";
import {getAllAuthors, deleteAuthor, getAuthorsByIds, getBooksByIds} from "../../services/authorService";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [booksName, setBookName] = useState([]);
    var bookIdsArray;
    useEffect(() => {
        fetchAuthors();
    },[]);


    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = authors.filter((author) =>
            author.name.toLowerCase().includes(value) // Assuming 'author.name' is searchable
        );
        setFilteredAuthors(filtered);
    };

    const fetchBookByBookId=async ()=>{
        const flatBookIdsArray = bookIdsArray.flat().filter((id) => id);
        console.log("Flattened Book IDs Array:", flatBookIdsArray);

        // Fetch book details for each book ID
         const books = await Promise.all(
            flatBookIdsArray.map(async (bookId) => {

                const bookData = await getBooksByIds(bookId);
                return bookData;
            })
        );
        setBookName(books);
        console.warn(books);
    }
    const fetchAuthors = async () => {
        const data = await getAllAuthors();
        console.log(data)
         bookIdsArray =  data.map((item) => {
            return item.bookIds;
         });
  fetchBookByBookId();
        const authorsWithDetails = await Promise.all(
            data.map(async (author) => {
                const authorDetails = await getAuthorsByIds(data.authorIds);

                return { ...author, books: authorDetails };
            })
        );

        setAuthors(authorsWithDetails);
        setFilteredAuthors(authorsWithDetails);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this author?")) {
            await deleteAuthor(id);
            await fetchAuthors();
        }
    };

    return (
        <div className="container mt-3">
            <h2 className="d-flex justify-content-between align-items-center">
                Authors
                <div>
                    {/*<Link to="/books/add" className="btn btn-primary">*/}
                    {/*    Add Book*/}
                    {/*</Link>*/}
                    <Link to="/authors/add" className="btn btn-primary ms-2">
                        Add Author
                    </Link>
                </div>
            </h2>

            <TextField
                label="Search by Name"
                variant="outlined"
                fullWidth
                className="my-3"
                value={searchTerm}
                onChange={handleSearch}
            />

            <table className="table table-bordered table-hover mt-3">
                <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Biography</th>
                    <th>Books</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredAuthors.map((author, i) => (
                    <tr key={author.id}>
                        <td>{author.name}</td>
                        <td>{author.biography}</td>
                        <td>
                            <ul>
                                {(() => {
                                    const items = [];
                                    for (let j = 0; j < author.bookIds.length; j++) {
                                        const bookId = author.bookIds[j];
                                        const book = booksName.find((b) => b.bookId === bookId);
                                        if (book) {
                                            items.push(<p key={book.bookId}>{book.title}</p>);
                                        }
                                    }
                                    return items;
                                })()}

                            </ul>
                        </td>

                        <td>
                            <Link to={`/authors/${author.id}/update`} className="btn btn-info btn-sm mr-2">
                                Update
                            </Link>
                            <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() => handleDelete(author.id)}
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

export default AuthorList;
