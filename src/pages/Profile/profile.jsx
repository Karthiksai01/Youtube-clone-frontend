import "./profile.css";
import SideNavbar from "../../components/SideNavbar/sideNavbar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = ({ sideNavbar }) => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/${id}/channel`);
      console.log("Response:", response);

      const videos = response.data.videoByUser;
      setData(videos);
      setUser(videos?.[0]?.user || null);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  return (
    <div className="profile">
      <SideNavbar sideNavbar={sideNavbar} />

      <div className={sideNavbar ? "profilePage" : "withoutSidenavbar"}>
        {/* Profile Header */}
        <div className="profile_Top">
          <div className="profile_Top_img">
            <img
              className="profile_image"
              src={
                user?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/1157/1157109.png"
              }
              alt="Profile"
            />
          </div>

          <div className="profile_about">
            <div className="profile_name">{user?.channelName || "Channel Name"}</div>
            <div className="profile_info">
              {user?.userName || "Username"} · videos
            </div>
            <div className="profile_info">{user?.about || "No about section"}</div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="profile_videos">
          <div className="profile_videos_title">
            Videos <ArrowRightIcon />
          </div>

          <div className="profileVideos">
            {data.map((item) => (
              <Link to={`/watch/${item._id}`} className="videos_block" key={item._id}>
                <div className="video_thumbnail">
                  <img src={item?.thumbnail} alt="Video Thumbnail" />
                </div>
                <div className="video-title">{item?.title}</div>
                <div className="video-detail-about">
                  Created at {new Date(item?.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
