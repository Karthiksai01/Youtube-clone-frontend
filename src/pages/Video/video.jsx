import React, { useState, useEffect } from 'react'; 
import './video.css'; 
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'; 
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'; 
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
function Video() {
  const [message, setmessage] = useState("");
  const [data, setData] = useState(null);
  const [videoUrl, setvideoUrl] = useState("")
  const { id } = useParams();
  const [comments, setComments] = useState([]);


  const fetchvideoById = async () => {
    await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((response) => {
      console.log(response);
      setData(response.data.VideoById);
      setvideoUrl(response?.data?.VideoById?.videoLink)
    }).catch(err => {
      console.log(err);
    })
  }
  const getCommentsByVideoId = async () => {
    await axios.get(`http://localhost:4000/commentApi/comment/${id}`,{
  withCredentials: true
}).then((response) => {
      console.log(response);
      setComments(response.data.comments);
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    fetchvideoById();
    getCommentsByVideoId();
  }, [])
  const handleComment = async () => {
  const body = {
    message: message,
    video: id
  };

  try {
    const resp = await axios.post("http://localhost:4000/commentApi/comment", body, { withCredentials: true });
    const newComment = resp.data.comment;
    setComments(prev => [newComment, ...prev]); 
    setmessage(""); // Clear input
  } catch (err) {
    toast.error("Please login first to comment");
  }
};



  return (
    <div className="video">
      <div className="video-post-section">

        <div className="video__youtube--video">
          {data && <video width="100%" controls autoPlay className="video__youtube--video">
            <source src={videoUrl} />
            <source src={videoUrl} />
            Your browser does not support the video tag.
          </video>}
        </div>

        <div className="video__youtube--about"> 
          <h2>{data?.title}</h2> 
        </div>

        
        <div className="youtube__video__profile__block"> 
          <div className="youtube__video__profile__block__left"> 
            <Link to={`/user/${data?.user?._id}`} className="youtube__video__profile__block__left__image"> 
              <img src={data?.user?.profilePic} alt="User Profile" className="profile__image" /> 
            </Link>
            <div className="youtube__video__profile__block__left__user__name">
              {data?.user?.channelName}
              <div className="youtube__video__profile__block__left__profile__subs">
                {data?.user?.createdAt.slice(0, 10)}
              </div>
            </div>
            <div className="subscribe__button">
              Subscribe
            </div>
          </div>
          <div className="youtube__video__profile__block__right">
            <div className="youtube__video__profile__block__right__top">
              <div className="youtube__video__profile__block__right__top__likes">
                <ThumbUpAltOutlinedIcon />
                <div className="youtube__video__profile__block__right__top__countOfLike">{data?.like}</div> 
              </div>
              <div className="youtube__video__profile__block__right__top__divider"></div> 
              <div className="youtube__video__profile__block__right__top__likes">
                <ThumbDownAltOutlinedIcon />

              </div>
            </div>
          </div>
        </div>

        
        <div className="youtube__video__about__description"> 
          {data?.createdAt.slice(0, 10)} 
          <p>{data?.description}</p>
        </div>

        
        <div className="youtube__video__comment"> 
          <div className="youtube__video__comment__section__title"> 
            {comments.length} 
          </div>

          
          <div className="youtube__self__comment"> 
            <div className="youtube__add__a__comment__image"> 
              <img src="your_profile_image_link.jpg" alt="User Profile" className="profile__image" /> 
            </div>
            <div className="add__a__comment__section">
              <input type="text" value={message} onChange={(e) => { setmessage(e.target.value) }} className="add__a__comment__input" placeholder="Add a comment" /> {/* Input field for adding comments [12] */}
              <div className="cancel__submit__comment"> 
                <div className="cancel__comment">Cancel</div> 
                <div className="cancel__comment" onClick={handleComment}>Comment</div> 
              </div>
            </div>
          </div>



          
          {
            comments.map((item, index) => (
              <div className="youtube__others__comment__section" key={index}>
                <div className="youtube__add__a__comment__image">
                  <img
                    src={item?.user?.profilePic}
                    alt="Commenter Profile"
                    className="profile__image"
                  />
                </div>
                <div>
                  <div className="others__comment__section__header">
                    <div className="channel__name__comment">
                      {item?.user?.channelName || "Anonymous"}
                    </div>
                    <div className="comment__timing__others">
                      {item?.createdAt.slice(0, 10)}
                    </div>
                  </div>
                  <div className="others__comment__section__comment">
    
                    {item?.message || "No comment message"}
                    
                  </div>
                </div>
              </div>
            ))
           
          }


        </div>

      </div>

      {/* Video Suggestions Section (Right Side) */}
      <div className="video-suggestion"> {/* Right section for suggested videos [7] */}
        Video Suggestions {/* Placeholder text [7] */}

        {/* Individual Suggested Video Block */}
        <div className="video__suggestion__block"> {/* Block for a single suggested video [16] */}
          <div className="video__suggestion__thumbnail"> {/* Div for video thumbnail [16] */}
            <img src="your_thumbnail_image_link.jpg" alt="Thumbnail" className="video__suggestion__thumbnail__image" /> {/* Thumbnail image [17] */}
          </div>
          <div className="video__suggestions__about"> {/* Div for video details (title, channel, views) [17] */}
            <div className="video__suggestions__about__title"> {/* Video title [18] */}
              T202 World Cup Final India vs Australia Last 5 Overs Highlights {/* Example video title [17] */}
            </div>
            <div className="video__suggestions__about__profile"> {/* Channel name [18] */}
              Cricket 320 {/* Example channel name [18] */}
            </div>
            <div className="video__suggestions__about__views"> {/* Views and time ago [18] */}
              136 views • 1 day ago {/* Example views and time [18] */}
            </div>
          </div>
        </div>

        {/* Multiple Suggested Video Blocks (repeated for demonstration) [19] */}
        <div className="video__suggestion__block">
          <div className="video__suggestion__thumbnail">
            <img src="your_thumbnail_image_link.jpg" alt="Thumbnail" className="video__suggestion__thumbnail__image" />
          </div>
          <div className="video__suggestions__about">
            <div className="video__suggestions__about__title">
              T202 World Cup Final India vs Australia Last 5 Overs Highlights
            </div>
            <div className="video__suggestions__about__profile">
              Cricket 320
            </div>
            <div className="video__suggestions__about__views">
              136 views • 1 day ago
            </div>
          </div>
        </div>
        <div className="video__suggestion__block">
          <div className="video__suggestion__thumbnail">
            <img src="your_thumbnail_image_link.jpg" alt="Thumbnail" className="video__suggestion__thumbnail__image" />
          </div>
          <div className="video__suggestions__about">
            <div className="video__suggestions__about__title">
              T202 World Cup Final India vs Australia Last 5 Overs Highlights
            </div>
            <div className="video__suggestions__about__profile">
              Cricket 320
            </div>
            <div className="video__suggestions__about__views">
              136 views • 1 day ago
            </div>
          </div>
        </div>
        <div className="video__suggestion__block">
          <div className="video__suggestion__thumbnail">
            <img src="your_thumbnail_image_link.jpg" alt="Thumbnail" className="video__suggestion__thumbnail__image" />
          </div>
          <div className="video__suggestions__about">
            <div className="video__suggestions__about__title">
              T202 World Cup Final India vs Australia Last 5 Overs Highlights
            </div>
            <div className="video__suggestions__about__profile">
              Cricket 320
            </div>
            <div className="video__suggestions__about__views">
              136 views • 1 day ago
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Video;