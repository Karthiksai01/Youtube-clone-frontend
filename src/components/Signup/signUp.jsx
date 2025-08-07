import { useState } from 'react';
import axios from "axios";
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import { Link ,useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function SignUp({ setLoginModel }) {
  const navigate = useNavigate();
  const [uploadImgUrl, setUploadImgUrl] = useState("https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbnZvKGUzLn3S6DcnYjI0yv9eSmyYeP.jpg");

  const [signUpForm, setSignUpForm] = useState({
    username: '',
    password: '',
    channelname: '',
    about: '',
    profilePic: uploadImgUrl,
  });

  const handleChange = (e) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Youtubeclone");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dd7khvxjd/image/upload", formData);
      const imageUrl = response.data.url;
      setUploadImgUrl(imageUrl);
      setSignUpForm({ ...signUpForm, profilePic: imageUrl });
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post('http://localhost:4000/auth/signup', {
        userName: signUpForm.username,
        password: signUpForm.password,
        channelName: signUpForm.channelname,
        about: signUpForm.about,
        profilePic: signUpForm.profilePic,
      });

      console.log("Signup success:", res.data);
      toast.success("Signup successful!");
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signUp">
      <div className="signUpCard">
        <div className="signUpTitle">
          <YouTubeIcon style={{ fontSize: '54px', color: 'red' }} />
          Sign Up
        </div>

        <div className="signUpInputs">
          <div className="signUpInput">
            <input
              type="text"
              name="channelname"
              placeholder="Channel Name"
              className="signUpInput_ip"
              value={signUpForm.channelname}
              onChange={handleChange}
            />
          </div>

          <div className="signUpInput">
            <input
              type="text"
              name="username"
              placeholder="User Name"
              className="signUpInput_ip"
              value={signUpForm.username}
              onChange={handleChange}
            />
          </div>

          <div className="signUpInput">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="signUpInput_ip"
              value={signUpForm.password}
              onChange={handleChange}
            />
          </div>

          <div className="signUpInput">
            <input
              type="text"
              name="about"
              placeholder="About Your Channel"
              className="signUpInput_ip"
              value={signUpForm.about}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="image_upload_signUp">
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
          />
          <div className="image_image_signUp_div">
            <img
              src={uploadImgUrl}
              alt="Profile"
              className="image_default_signUp_image"
            />
          </div>
        </div>

        <div className="signUp_buttons">
          <div className="signUp_button" onClick={handleSignUp}>
            Sign Up
          </div>
          <Link to="/" className="signUp_button" onClick={() => setLoginModel(false)}>
            Home
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
