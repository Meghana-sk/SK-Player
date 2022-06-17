import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authentication/auth-context";
import { LOGOUT } from "../../shared/types";
import "./navbar.css";
import { useState, useEffect } from "react";
import axios from "axios";

export const Navbar = () => {
  const navigate = useNavigate();
  const { authState, authDispatch } = useAuth();
  const isUser = authState.token || authState.user ? true : false;

  const [search, setSearch] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchPopupClose, setSearchPopupClose] = useState(false);

  const logoutHandler = () => {
    if (authState.token) {
      toast.info("Log out successful");
      navigate("/");
      localStorage.removeItem("token");
      authDispatch({ type: LOGOUT });
    } else {
      navigate("/login");
    }
  };

  const getVideos = async () => {
    try {
      const response = await axios.get("/api/videos");
      if (response.status === 200) {
        setVideoList(response.data.videos);
      } else {
        throw new Error("Error Occured, Please Try Again");
      }
    } catch (error) {
      toast.error(error.response.data.errors[0]);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const searchResults = () => {
    const serachData = videoList?.filter((video) =>
      video.title.toLowerCase().includes(search?.toLocaleLowerCase())
    );
    setSearchData(() => serachData);
    setSearchPopupClose((prevCloseState) => !prevCloseState);
  };

  const getSearchResults = (e) => {
    setSearch(() => e.target.value);
    searchResults();
  };

  return (
    <nav className="nav bg-dark">
      <Link to="/" className="brand-name text-l fw-900">
        SK Player
      </Link>
      <div className="search-box">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search videos"
            value={search}
            onChange={getSearchResults}
          />
          <button className="search-btn" onClick={getSearchResults}>
            <i className="fas fa-search" />
          </button>
        </div>
        {!searchPopupClose && (
          <ul className="search-list">
            {search && searchData.length > 0
              ? searchData.map((video) => (
                  <li
                    key={video._id}
                    className="video-search-item"
                    onClick={() => {
                      navigate(`/video/${video._id}`);
                      setSearchPopupClose((prevCloseState) => !prevCloseState);
                    }}
                  >
                    {video.title}
                  </li>
                ))
              : search !== "" && <li>No results found</li>}
          </ul>
        )}
      </div>
      <div className="user-section">
        {isUser && (
          <span className="user-name">
            {authState.token ? `Hi, ${authState?.user?.firstName}` : null}
          </span>
        )}
        <button
          className="btn btn-primary login-btn"
          onClick={() => logoutHandler()}
        >
          <i className="fas fa-user"></i>
          {isUser ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};
