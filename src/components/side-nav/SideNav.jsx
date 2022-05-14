import { NavLink } from "react-router-dom";
import "./sideNav.css";

const getActiveStyle = ({ isActive }) => ({
  margin: "1rem 0",
  backgroundColor: isActive ? "#2e3238" : null,
  color: "whitesmoke",
});
export const SideNav = () => {
  return (
    <aside className="side-nav bg-side-nav-dark">
      <NavLink to="/" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="far fa-compass"></i>
          </span>
          <span>Explore</span>
        </div>
      </NavLink>
      <NavLink to="/" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="fas fa-list-ul"></i>
          </span>
          <span>Playlist</span>
        </div>
      </NavLink>
      <NavLink to="/watchlater" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="far fa-clock"></i>
          </span>
          <span>Watch later</span>
        </div>
      </NavLink>
      <NavLink to="/liked" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="far fa-thumbs-up"></i>
          </span>
          <span>Liked</span>
        </div>
      </NavLink>
      <NavLink to="/" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="fas fa-history"></i>
          </span>
          <span>History</span>
        </div>
      </NavLink>
    </aside>
  );
};
