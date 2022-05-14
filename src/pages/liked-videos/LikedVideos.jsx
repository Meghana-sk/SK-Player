import axios from "axios";
import { useEffect, useState } from "react";
import { SideNav } from "../../components/side-nav/SideNav";
import { VideoCard } from "../../components/video-card/VideoCard";
import { useAuth } from "../../context/authentication/auth-context";
import { useLike } from "../../context/like-video/like-video-context";

export const LikedVideos = () => {
  const [likedVideoList, setLikedVideoList] = useState([]);
  const { likeState } = useLike();
  const {
    authState: { token },
  } = useAuth();
  const getLikedVideos = async () => {
    try {
      const response = await axios.get("/api/user/likes", {
        headers: { authorization: token },
      });
      if (response.status === 200) {
        setLikedVideoList(response.data.likes);
      }
      console.log(response);
    } catch (e) {}
  };
  //   useEffect(() => {
  //     console.log("In lieks");
  //     getLikedVideos();
  //   }, [likedVideoList]);
  return (
    <>
      <SideNav />
      {likeState.likes.map((video) => (
        <VideoCard {...video} />
      ))}
    </>
  );
};
