import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteMember, getAllMembers } from "../../services/memberService";

const MemberList = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        fetchMembers().then(r => "");
    }, []);

    const fetchMembers = async () => {
        const data = await getAllMembers();
        setMembers(data);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            await deleteMember(id);
            await fetchMembers();
        }
    };

    return (
        <div className="container mt-3">
            <h2 className="d-flex justify-content-between align-items-center">
                Members
                <Link to="/members/add-member" className="btn btn-primary">
                    Add Member
                </Link>
            </h2>
            <table className="table table-bordered table-hover mt-3">
                <thead className="thead-dark">
                <tr>
                    <th>Member Name</th>
                    <th>Member Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {members.map((member) => (
                    <tr key={member.memberId}>
                        <td>{member.memberName}</td>
                        <td>{member.memberEmail}</td>
                        <td>
                            <Link
                                to={`/members/update-member/${member.memberId}`}
                                className="btn btn-info btn-sm mr-2"
                            >
                                Update
                            </Link>
                            <button
                                className="btn btn-danger btn-sm ms-2"
                                onClick={() => handleDelete(member.memberId)}
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

export default MemberList;
