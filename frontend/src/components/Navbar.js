import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBook, FaUser, FaUsers, FaArrowCircleRight } from "react-icons/fa";

const Navbar = () => (
    <div className="d-flex flex-column vh-100 bg-dark p-4 shadow-lg rounded">
        <h4 className="text-center text-white mb-4">LMS</h4>
        <nav className="nav flex-column">
            <Link className="nav-link  text-white p-2 rounded-lg mb-2 hover-effect" to="/books">
                <FaBook className="me-2"/> Books
            </Link>
            <Link className="nav-link  text-white p-2 rounded-lg mb-2 hover-effect" to="/authors">
                <FaUser className="me-2"/> Authors
            </Link>
            <Link className="nav-link  text-white p-2 rounded-lg mb-2 hover-effect" to="/members">
                <FaUsers className="me-2"/> Members
            </Link>
            <Link className="nav-link  text-white p-2 rounded-lg mb-2 hover-effect" to="/borrows">
                <FaArrowCircleRight className="me-2"/> Borrows
            </Link>
        </nav>
    </div>
);

export default Navbar;
