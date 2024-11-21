import React, { useEffect, useState } from "react";
import { getAllAuthors, deleteAuthor, getAuthorsByIds } from "../../services/authorService"; // Service to get authors and delete
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchAuthors();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = authors.filter((author) =>
            author.name.toLowerCase().includes(value) // Assuming 'author.name' is searchable
        );
        setFilteredAuthors(filtered);
    };

    const fetchAuthors = async () => {
        const data = await getAllAuthors();

        const authorsWithDetails = await Promise.all(
            data.map(async (author) => {
                const authorDetails = await getAuthorsByIds(author.authorIds); // Assuming `authorIds` is an array
                return { ...author, authors: authorDetails };
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
                <Link to="/authors/add" className="btn btn-primary">
                    Add Author
                </Link>
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
                    <th>Books Count</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredAuthors.map((author) => (
                    <tr key={author.id}>
                        <td>{author.name}</td>
                        <td>{author.biography}</td>
                        <td>{author.bookIds ? author.bookIds.length : 0}</td> {/* Displaying the count of books */}
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
