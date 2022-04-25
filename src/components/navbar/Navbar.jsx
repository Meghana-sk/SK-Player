import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const isUser = false;
  return (
    <nav className="nav bg-dark">
      <Link to="/" className="brand-name text-l fw-900">
        SK Player
      </Link>
      <div className="search-box">
        <input type="text" placeholder="Search videos" />
        <button className="search-btn">
          <i className="fas fa-search" />
        </button>
      </div>
      <div className="user-section">
        {isUser ? (
          <>
            <span className="user-name">Hi, Meghana</span>
            <i className="fas fa-user"></i>
          </>
        ) : (
          <button
            className="btn btn-primary login-btn"
            onClick={() => navigate("/login")}
          >
            <i className="fas fa-user"></i>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
