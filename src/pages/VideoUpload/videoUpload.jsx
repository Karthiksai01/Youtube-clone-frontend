import React from 'react';
import { useState,useEffect } from 'react';
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

function VideoUpload() {
  const [videoUploadForm,setVideoUploadForm]=useState({'title':"",'description':"","videoType":"","thumbnail":"","videoLink":""});
  const[loading,setLoading]=useState(false);

  const navigate=useNavigate();

  const handleUploadChange=(e)=>{
    setVideoUploadForm({...videoUploadForm, [e.target.name]: e.target.value})
      console.log(videoUploadForm)
  }
  const uploadImage = async (e,type) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "Youtubeclone");
    setLoading(true)
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dd7khvxjd/${type}/upload`,
        formData
      );
      const url=response.data.url;
      let val= type==='image'?"thumbnail":"videoLink";
      setVideoUploadForm({...videoUploadForm,[val]:url})
      
      console.log("Uploaded URL:", response.data.secure_url);
      console.log(response)
    
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setLoading(false)
  };
  console.log(videoUploadForm)
  useEffect(()=>{
    let isLogin=localStorage.getItem("userId")
    if(isLogin===null){
      navigate('/')
    }
  },[])
  const handleSubmitButton=async()=>{
    setLoading(true)
    axios.post("https://youtube-clone-backend-va2g.onrender.com/api/video",videoUploadForm,{ withCredentials: true })
  .then((resp)=>{
       console.log(resp)
       setVideoUploadForm(false);
       navigate('/')
    }).catch(err=>{
      console.log(err)
      setVideoUploadForm(false)
    })
  }


  return (
    <div className="videoUpload"> 
      <div className="uploadBox"> 
        <div className="uploadVideoTitle"> 
         
          <YouTubeIcon style={{ fontSize: '54px', color: 'red' }} /> 
          Upload Video 
        </div>

        <div className="uploadForm"> 
          <input
            type="text"
            placeholder="Title of the video"
            className="uploadFormInputs"
            name="title"
            onChange={handleUploadChange}
          /> 
          <input
            type="text"
            placeholder="Description"
            className="uploadFormInputs"
            name='description'
            onChange={handleUploadChange}
          /> 
          <input
            type="text"
            placeholder="videoType"
            className="uploadFormInputs"
            name='videoType'
            onChange={handleUploadChange}
          /> {/* Category input field [5] */}

          <div>{/* Wrapper for Thumbnail input [6] */}
            Thumbnail
            <input type="file" accept="image/*" onChange={(e)=>uploadImage(e,"image")}/>
          </div>

          <div> 
            Video
            <input type="file" accept="video/mp4,video/webm,video/*" onChange={(e)=>uploadImage(e,"video")} /> {/* Video file input, accepting specific video formats [6] */}
          </div>
        </div>

        <div className="uploadButtons">
          <div className="uploadButtonForm" onClick={handleSubmitButton}>Upload </div>
          <Link to="/" className="uploadButtonForm"> {/* Home button, navigating to the home page [1, 6] */}
            Home
          </Link>
        </div>
        {loading && (
        <div style={{ marginTop: '10px' }}>
          <CircularProgress />
        </div>
      )}
      </div>
    </div>
  );
}

export default VideoUpload;