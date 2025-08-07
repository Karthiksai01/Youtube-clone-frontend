import React from 'react'
import "./homePage.css"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const homePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://youtube-clone-backend-va2g.onrender.com/api/allvideos').then(res => {
      console.log(res.data)
      setData(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])


  const options = ["All", "Cricket", "Music", "Gaming", "Debates", "Democracy", "Comedy", "Movies", "Telugu Cinema", "Trailers", "Travel", "Technology", "Study", "Shopping", "Horror", "Web series", "vlogs", "Live"]
  return (
    <div className={sideNavbar ? 'homepage' : "fullHomePage"}>
      <div className="homepage_options">
        {
          options.map((item, index) => {
            return (
              <div key={index} className="homepage_option">
                {item}
              </div>

            )

          })
        }
      </div>
      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutSidebar"}>
        {
          data?.map((item, ind) => {
            return (
              <Link to={`/watch/${item._id}`} key={item._id || ind} className="youtube_Video">
                <div className="youtube_thumbnailBox">
                  <img src={item.thumbnail} alt="thumbnail" className='youtube_thumbnailPic' />
                  <div className="youtube_timingThumbnail"></div>
                </div>
                <div className="youtubeTitleBox">
                  <div className="youtubeTitleBoxProfile">
                    <img src={item?.user?.profilePic} alt="profile" className='youtube_thumbnail_Profile'/>
                  </div>
                  <div className="youtubeTitleBox_Title">
                    <div className="youtube_videoTitle">{item?.title}</div>
                    <div className="youtube_channelName">{item?.user?.channelName}</div>
                    <div className="youtubeVideo_views">{item?.like}</div>
                  </div>
                </div>
              </Link>
            )
          })
        }
        
      </div>
    </div>

  )
}

export default homePage
