import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
      toast.error(error.response.data.errors[0]);
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
        toast.error(error.response.data.errors[0]);
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
    <>
      <SideNav />
      <div className="explore-container">
        <div className="explore-content" key={videoList}>
          <div className="filter-container">
            <button
              className={`btn btn-secondary catgeory-btn ${
                selectedCategory === "" ? "btn-category-active" : ""
              }`}
              key={selectedCategory}
              onClick={() => handleCategoryClick()}
            >
              All
            </button>
            {categories.length > 0
              ? categories.map((category) => (
                  <button
                    className={`btn btn-secondary catgeory-btn ${
                      selectedCategory === category.categoryName
                        ? "btn-category-active"
                        : ""
                    }`}
                    key={category.categoryName}
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
              <VideoCard {...video} key={video._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
