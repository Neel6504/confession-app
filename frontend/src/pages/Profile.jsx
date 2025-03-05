import React, { useEffect, useState } from "react";
import { getUserConfessions, deleteConfession } from "../api";
import "../styles/Home.css";

const Profile = () => {
    const [confessions, setConfessions] = useState([]);

    useEffect(() => {
        fetchUserConfessions();
    }, []);

    const fetchUserConfessions = async () => {
        const { data } = await getUserConfessions();
        setConfessions(data);
    };

    const handleDelete = async (id) => {
        await deleteConfession(id);
        fetchUserConfessions();
    };

    return (
        <div className="container">
            {confessions.map((confession) => (
                <div key={confession._id} className="confession">
                    <div className="confession-text">"{confession.text}"</div>
                    <div className="confession-actions">
                        <button className="btn btn-danger" onClick={() => handleDelete(confession._id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Profile;
