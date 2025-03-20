import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Home.css"; // Ensure this path is correct
import Navbar from "./Navbar";

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

  // ✅ Function to get avatar based on gender
  const getAvatar = (gender) => {
    console.log("Gender received:", gender); // Debugging gender data

    if (!gender) return "https://cdn-icons-png.flaticon.com/512/2922/2922688.png"; // Default avatar
    const lowerGender = gender.toLowerCase().trim(); // Normalize input

    if (lowerGender === "male") return "https://cdn-icons-png.flaticon.com/512/2922/2922510.png";
    if (lowerGender === "female") return "https://cdn-icons-png.flaticon.com/512/2922/2922561.png";
    
    return "https://cdn-icons-png.flaticon.com/512/2922/2922688.png"; // Default avatar
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        {confessions.length === 0 ? (
          <p className="no-confession">No confessions yet.</p>
        ) : (
          confessions.map((confession) => {
            console.log("User Data:", confession.userId); // Debugging user data
            console.log("Gender for user:", confession.userId?.gender); // Checking gender value
            return (
              <div key={confession._id} className="confession-card">
                <div className="confession-header">
                  <img 
                    src={getAvatar(confession.userId?.gender)} 
                    alt="User Avatar" 
                    className="user-avatar" 
                  />
                 <span className="username">{confession.userId}</span>
                </div>
                <p className="confession-text">{confession.confessionText}</p>
                <div className="confession-actions">
                  <button className="like-button" onClick={() => handleLike(confession._id)}>
                    ❤️ {confession.likes}
                  </button>
                  <button className="superlike-button" onClick={() => handleSuperLike(confession._id)}>
                   🔥 {confession.superLikes}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
