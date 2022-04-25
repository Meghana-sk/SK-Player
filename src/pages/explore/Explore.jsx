import { useState, useEffect } from "react";
import axios from "axios";
import { VideoCard } from "../../components/video-card/VideoCard";
import { SideNav } from "../../components/side-nav/SideNav";
import { CircularLoader } from "../../components/loaders/circular-loader/CircularLoader";
import "./explore.css";

export const Explore = () => {
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getVideos = async () => {
    try {
      const response = await axios.get("/api/videos");
      if (response.status === 200) {
        console.log(response.data.videos);
        setVideoList(response.data.videos);
        setLoading(false);
      } else {
        setLoading(true);
        throw new Error("Error Occured, Please Try Again");
      }
    } catch (error) {
      setLoading(true);
      alert(error.response);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div className="explore-container">
      <SideNav />
      <div className="explore-content">
        <div className="filter-container">
          <button className="btn btn-secondary">All</button>
          <button className="btn btn-secondary">Horror</button>
          <button className="btn btn-secondary">Comedy</button>
          <button className="btn btn-secondary">Thriller</button>
          <button className="btn btn-secondary">Action</button>
        </div>
        {isLoading && <CircularLoader />}
        <div className="videos-container" key={""}>
          {videoList.map((video) => (
            <VideoCard {...video} />
          ))}
        </div>
      </div>
    </div>
  );
};
