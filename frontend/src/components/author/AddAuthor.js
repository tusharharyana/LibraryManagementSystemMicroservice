import React, { useState } from "react";
import { createAuthor } from "../../services/authorService";
import { useNavigate } from "react-router-dom";

const AddAuthor = () => {
    const [name, setName] = useState("");
    const [biography, setBiography] = useState("");
    const [bookIds, setBookIds] = useState("");  // Assuming the user will enter book IDs as a comma-separated string
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !biography) {
            setError("Name and biography are required");
            return;
        }
        const newAuthor = {
            name,
            biography,
            bookIds: bookIds.split(",").map((id) => id.trim()) // Convert the string into an array of book IDs
        };

        try {
            await createAuthor(newAuthor);
            navigate("/authors"); // Redirect to the authors list after successfully creating an author
        } catch (error) {
            setError("Error creating author. Please try again.");
        }
    };

    return (
        <div className="container mt-3">
            <h2>Add New Author</h2>
            {error && <div className="alert alert-danger">{error}</div>}
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
                    Add Author
                </button>
            </form>
        </div>
    );
};

export default AddAuthor;
