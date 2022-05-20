import { useState, useEffect } from "react";
import axios from "axios";
import { VideoCard } from "../../components/video-card/VideoCard";
import { SideNav } from "../../components/side-nav/SideNav";
import { CircularLoader } from "../../components/loaders/circular-loader/CircularLoader";
import "./explore.css";

export const Explore = () => {
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [videoCategoryData, setVideoCategoryData] = useState({
    categories: [],
    selectedCategory: "",
  });
  const { categories, selectedCategory } = videoCategoryData;
  const getVideos = async () => {
    try {
      const response = await axios.get("/api/videos");
      if (response.status === 200) {
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

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/categories");
        if (response.status === 200) {
          setVideoCategoryData((videoCategory) => ({
            ...videoCategory,
            categories: response.data.categories,
          }));
        }
      } catch (error) {
        console.error(error.response);
      }
    })();
  }, []);

  const handleCategoryClick = (categoryName = "") => {
    setVideoCategoryData((categoryData) => ({
      ...categoryData,
      selectedCategory: categoryName,
    }));
  };

  const getCategorizedData = () =>
    selectedCategory
      ? videoList.filter((video) => video.category === selectedCategory)
      : videoList;

  return (
    <div className="explore-container">
      <SideNav />
      <div className="explore-content">
        <div className="filter-container">
          <button
            className={`btn btn-secondary ${
              selectedCategory === "" ? "btn-category-active" : ""
            }`}
            onClick={() => handleCategoryClick()}
          >
            All
          </button>
          {categories.length > 0
            ? categories.map((category) => (
                <button
                  className={`btn btn-secondary ${
                    selectedCategory === category.categoryName
                      ? "btn-category-active"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category.categoryName)}
                >
                  {category.categoryName}
                </button>
              ))
            : null}
        </div>
        {isLoading && <CircularLoader />}
        <div className="videos-container" key={videoList}>
          {getCategorizedData().map((video) => (
            <VideoCard {...video} />
          ))}
        </div>
      </div>
    </div>
  );
};
