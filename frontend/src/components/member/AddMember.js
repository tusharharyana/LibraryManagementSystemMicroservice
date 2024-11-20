import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMember } from "../../services/memberService";

const AddMember = () => {
    const [memberName, setMemberName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const member = { memberName, memberEmail };
        await createMember(member);
        navigate("/members");
    };

    return (
        <div className="container mt-3">
            <h2>Add Member</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Member Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Member Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Add Member
                </button>
            </form>
        </div>
    );
};

export default AddMember;
