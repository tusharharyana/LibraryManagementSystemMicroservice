import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberById, updateMember } from "../../services/memberService";

const UpdateMember = () => {
    const [memberName, setMemberName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMember().then(r => "");
    }, []);

    const fetchMember = async () => {
        const data = await getMemberById(id);
        setMemberName(data.memberName);
        setMemberEmail(data.memberEmail);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedMember = { memberName, memberEmail };
        await updateMember(id, updatedMember);
        navigate("/members");
    };

    return (
        <div className="container mt-3">
            <h2>Update Member</h2>
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
                    Update Member
                </button>
            </form>
        </div>
    );
};

export default UpdateMember;
