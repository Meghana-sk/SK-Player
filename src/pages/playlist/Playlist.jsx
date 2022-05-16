import { useNavigate } from "react-router-dom";
import { SideNav } from "../../components/side-nav/SideNav";
import "./playlist.css";
export const Playlist = () => {
  const navigate = useNavigate();
  const playlist = [1, 2, 3];
  return (
    <div>
      <SideNav />
      <h2>Playlist name</h2>
      {playlist.map((list) => (
        <div onClick={() => navigate(`/playlist/${list}`)}>
          <div className="playlist text-left">playlist name</div>
        </div>
      ))}
    </div>
  );
};
