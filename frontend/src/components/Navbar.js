import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => (
    <div className="d-flex flex-column vh-100 bg-light p-3">
        <h4>Menu</h4>
        <nav className="nav flex-column">
            <Link className="nav-link text-dark" to="/books">
                Books
            </Link>
            <Link className="nav-link text-dark" to="/authors">
                Authors
            </Link>
            <Link className="nav-link text-dark" to="/members">
                Members
            </Link>
            <Link className="nav-link text-dark" to="/borrows">
                Borrows
            </Link>
        </nav>
    </div>
);

export default Navbar;
