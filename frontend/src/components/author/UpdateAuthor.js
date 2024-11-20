import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthorById, updateAuthor } from "../../services/authorService";

const UpdateAuthor = () => {
    const [author, setAuthor] = useState(null);
    const [name, setName] = useState("");
    const [biography, setBiography] = useState("");
    const [bookIds, setBookIds] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchAuthor().then(r => "");
    }, [id]);

    const fetchAuthor = async () => {
        try {
            const data = await getAuthorById(id);
            setAuthor(data);
            setName(data.name);
            setBiography(data.biography);
            setBookIds(data.bookIds.join(", ")); // Assuming bookIds is an array of strings
        } catch (error) {
            setError("Error fetching author details.");
        }
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
            bookIds: bookIds.split(",").map((id) => id.trim()) // Convert the string into an array of book IDs
        };

        try {
            await updateAuthor(id, updatedAuthor);
            navigate("/authors"); // Redirect to authors list after successful update
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
                            Book IDs (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="bookIds"
                            className="form-control"
                            value={bookIds}
                            onChange={(e) => setBookIds(e.target.value)}
                        />
                        <small className="form-text text-muted">
                            Enter the book IDs this author is associated with, separated by commas.
                        </small>
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
