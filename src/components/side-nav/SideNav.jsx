import { NavLink } from "react-router-dom";
import "./sideNav.css";

const getActiveStyle = ({ isActive }) =>
  isActive
    ? {
        color: "whitesmoke",
        fontWeight: "bold",
      }
    : { color: "whitesmoke" };
export const SideNav = () => {
  return (
    <aside className="side-nav bg-side-nav-dark">
      <NavLink to="/" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="far fa-compass"></i>
          </span>
          <span className="menu-text">Explore</span>
        </div>
      </NavLink>
      <NavLink to="/playlist" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="fas fa-list-ul"></i>
          </span>
          <span className="menu-text">Playlist</span>
        </div>
      </NavLink>
      <NavLink to="/watchlater" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="far fa-clock"></i>
          </span>
          <span className="menu-text">Watch later</span>
        </div>
      </NavLink>
      <NavLink to="/liked" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="far fa-thumbs-up"></i>
          </span>
          <span className="menu-text">Liked</span>
        </div>
      </NavLink>
      <NavLink to="/history" style={getActiveStyle}>
        <div className="nav-item">
          <span>
            <i className="fas fa-history"></i>
          </span>
          <span className="menu-text">History</span>
        </div>
      </NavLink>
    </aside>
  );
};
