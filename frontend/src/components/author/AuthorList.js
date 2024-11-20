import React, { useEffect, useState } from "react";
import { getAllAuthors, deleteAuthor } from "../../services/authorService"; // Service to get authors and delete
import { Link } from "react-router-dom";

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetchAuthors().then(r => "");
    }, []);

    const fetchAuthors = async () => {
        const data = await getAllAuthors();
        setAuthors(data);
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
                <Link to="/add-author" className="btn btn-primary">
                    Add Author
                </Link>
            </h2>
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
                {authors.map((author) => (
                    <tr key={author.id}>
                        <td>{author.name}</td>
                        <td>{author.biography}</td>
                        <td>{author.bookIds ? author.bookIds.length : 0}</td> {/* Displaying the count of books */}
                        <td>
                            <Link to={`/update-author/${author.id}`} className="btn btn-info btn-sm mr-2">
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
