import React, { useState } from 'react';
import './login.css';
import YouTubeIcon from '@mui/icons-material/YouTube'; 
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ setLoginModel }) { 
    const [loginForm,setLoginForm]=useState({'username':"",'password':""});
    console.log(loginForm)
    const handleLoginChange=(e)=>{
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }
    const handleLoginFunc=async ()=>{
      await axios.post("https://youtube-clone-backend-va2g.onrender.com/auth/login",loginForm,{ withCredentials: true }).then((response=>{
        console.log(response)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("userProfilePic",response.data.user.profilePic || "");
        window.location.reload();


      })).catch(err=>{
        toast.error("Invalid Credentails")
        console.log(err)
      })
    }
  return (
    <div className="login"> {/* Main container for the login modal [2] */}
      <div className="loginCard"> {/* The card-like container for the login form [2] */}
        <div className="titleCard_login"> {/* Title section of the login card [3] */}
          <YouTubeIcon style={{ fontSize: '54px', color: 'red' }} /> {/* YouTube icon [3] */}
          Login {/* Title text [3] */}
        </div>

        <div className="loginCredential"> {/* Container for username and password input fields [6] */}
          <div className="username_login"> {/* Wrapper for the username input [6] */}
            <input
              type="text"
              placeholder="Username"
              name="userName"
              className="username_login_username" 
              onChange={handleLoginChange}
              //value={loginForm.username}

            />
          </div>

          <div className="username_login"> {/* Wrapper for the password input (reusing the same styling class) [7] */}
            <input
              type="password" 
              name="password"// Type is 'password' to hide characters [7]
              placeholder="Password"
              className="username_login_username" 
              onChange={handleLoginChange}
              value={loginForm.password}
            />
          </div>
        </div>

        <div className="loginButton"> {/* Container for action buttons (Login, Sign Up, Cancel) [7] */}
          <div className="login_button" onClick={handleLoginFunc}> {/* Login button [7] */}
            Login
          </div>

          {/* Link to the Sign Up page, also styled as a button [4, 8] */}
          <Link to="/signup" className="login_button" onClick={() => setLoginModel(false)}>
            Sign Up
          </Link>
          
          <div className="login_button" onClick={() => setLoginModel(false)}> {/* Cancel button, closes the login modal [5] */}
            Cancel
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Login;
