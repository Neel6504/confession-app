import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Home.css"; // Adjusted path to styles folder


const Home = () => {
  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/confessions/all");
        setConfessions(response.data);
      } catch (error) {
        console.error("Error fetching confessions:", error);
      }
    };

    fetchConfessions();
  }, []);

  const handleLike = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/confessions/like/${id}`);
      setConfessions((prev) =>
        prev.map((confession) =>
          confession._id === id ? { ...confession, likes: confession.likes + 1 } : confession
        )
      );
    } catch (error) {
      console.error("Error liking confession:", error);
    }
  };

  const handleSuperLike = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/confessions/superlike/${id}`);
      setConfessions((prev) =>
        prev.map((confession) =>
          confession._id === id ? { ...confession, superLikes: confession.superLikes + 1 } : confession
        )
      );
    } catch (error) {
      console.error("Error super-liking confession:", error);
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">All Confessions</h1>
      {confessions.length === 0 ? (
        <p className="no-confession">No confessions yet.</p>
      ) : (
        confessions.map((confession) => (
          <div key={confession._id} className="confession-card">
            <div className="confession-header">
              <img src="/avatar.png" alt="User Avatar" className="user-avatar" />
              <span className="username">{confession.userId}</span>
            </div>
            <p className="confession-text">{confession.confessionText}</p>
            <div className="confession-actions">
              <button className="like-button" onClick={() => handleLike(confession._id)}>
                ❤️ {confession.likes}
              </button>
              <button className="superlike-button" onClick={() => handleSuperLike(confession._id)}>
                💬 {confession.superLikes}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
