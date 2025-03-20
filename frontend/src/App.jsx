import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./pages/Navbar";
import "./styles/Navbar.css";  // Adjust path as needed

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<MainLayout />} /> {/* ✅ Wrap Home inside MainLayout */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

// ✅ Fix: Use useLocation inside the component
const MainLayout = () => {
  const location = useLocation();

  return (
    <>
      {/* ✅ Show Navbar ONLY on /home */}
      {location.pathname === "/home" && <Navbar />}

      <Home /> {/* ✅ Show Home page content */}
    </>
  );
};

export default App;
