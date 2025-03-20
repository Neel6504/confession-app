import { useState, useEffect } from "react";
import ConfessionCard from "../components/ConfessionCard"; // Import the component

const Profile = () => {
  const [confessions, setConfessions] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("❌ No userId found!");
      return;
    }

    fetch(`http://localhost:5000/api/confessions/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔹 Fetched Confessions:", data);
        setConfessions(data);
      })
      .catch((error) => console.error("❌ Error fetching confessions:", error));
  }, [userId]);

  const handleDelete = async (confessionId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/confessions/${confessionId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setConfessions(confessions.filter((confession) => confession._id !== confessionId));
      } else {
        console.error("❌ Failed to delete confession");
      }
    } catch (error) {
      console.error("❌ Error deleting confession:", error);
    }
  };

  return (
    <div>
      <h2>My Confessions</h2>
      {confessions.length > 0 ? (
        <div className="confession-container">
          {confessions.map((confession) => (
            <ConfessionCard key={confession._id} confession={confession} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p>No confessions found.</p>
      )}
    </div>
  );
};

export default Profile;
