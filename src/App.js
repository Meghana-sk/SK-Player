import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/navbar/Navbar";
import { Explore } from "./pages/explore/Explore";
import { Error404 } from "./pages/page-not-found/Error404";
import { Login } from "./pages/authentication/Login";
import { Signup } from "./pages/authentication/Signup";
import { VideoPlayer } from "./pages/video-player/VideoPlayer";
import { LikedVideos } from "./pages/liked-videos/LikedVideos";
import { WatchLater } from "./pages/watch-later/WatchLater";
import { History } from "./pages/history/History";
import { Playlist } from "./pages/playlist/Playlist";
import { PlaylistVideo } from "./pages/playlist/PlaylistVideos";
import { RequiresAuth } from "./routes/private-routes/RequiresAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer
        theme="colored"
        autoClose={3000}
        position="bottom-right"
        closeOnClick
      />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/video/:videoId" element={<VideoPlayer />} />
        <Route
          path="/liked"
          element={
            <RequiresAuth>
              <LikedVideos />
            </RequiresAuth>
          }
        />
        <Route
          path="/watchlater"
          element={
            <RequiresAuth>
              <WatchLater />
            </RequiresAuth>
          }
        />
        <Route
          path="/history"
          element={
            <RequiresAuth>
              <History />
            </RequiresAuth>
          }
        />
        <Route
          path="/playlist"
          element={
            <RequiresAuth>
              <Playlist />
            </RequiresAuth>
          }
        />
        <Route
          path="/playlist/:playlistId"
          element={
            <RequiresAuth>
              <PlaylistVideo />
            </RequiresAuth>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
