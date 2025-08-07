import React,{useState,useEffect} from "react";
import "./Navbar.css";
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import sideNavbar from "../SideNavbar/sideNavbar";
import { Link, useNavigate} from "react-router-dom";

import Login from "../Login/login";

const Navbar=({setSideNavbarFunc,sideNavbar})=>{
    const[userpic,setUserPic]=useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThbJtA59VKWBURvJ8Vf6B6t7oihcwM0m649QTLO0HD7xry4OtdGwyQcIbEZqI8_Qc4QIU&usqp=CAU");
    const[navbarModel,setNavbarModel]=useState(false);

    const [login,setLogin]=useState(false)
    const [isLogedIn,setIsLogedIn]=useState(false)
    
    const navigate=useNavigate();

    const handleClickModel=()=>{
        setNavbarModel(prev=>!prev);
    }
    const sideNavbarFunc=()=>{
        setSideNavbarFunc(!sideNavbar)
    }
    const handleProfile=()=>{
        let userId=localStorage.getItem("userId")
        navigate(`/user/${user}`);
        setNavbarModel(false);
    }
    const onclickPopUp=(button)=>{
        setNavbarModel(false)
        if(button==="login"){
           setLogin(true)
        }else{
            localStorage.clear();
            getLogoutFun()
            setTimeout(()=>{
                navigate('/')
                window.location.reload();
            },2000);
        }
    }
    const getLogoutFun=async()=>{
        axios.post("https://youtube-clone-backend-va2g.onrender.com/auth/logout",{},{withCredentials:true}).then((res)=>{
            console.log('Logout')
        }).catch(err=>{
            console.log(err)
        })
    }
    const setLoginModel=()=>{
        setLogin(false)
    }
    useEffect(()=>{
        let userProfilePic=localStorage.getItem("userProfilePic");
        setIsLogedIn(localStorage.getItem('userId')!==null?true:false);
        if(userProfilePic!==null){
            setUserPic(userProfilePic)
        }

    },[])


    return(
        <div className="navbar">
            <div className="navbar-left">
                <div className="navbarHamberger" onClick={sideNavbarFunc}>
                    <MenuIcon sx={{color:"white"}}/>
                </div>
                <Link to={"./"} className="navbar_youtubeImg">
                    <YouTubeIcon sx={{fontSize:"34px"}} className="navbar-youtubeImage"/>
                    <div className="navbar-utubeTitle">YouTube</div>
                </Link>
            </div>    
            <div className="navbar-middle">
                <div className="navbar-searchbox">
                    <input className="navbar-searchboxInput" type="text" placeholder="Search"/>
                    <div className="navbar_searchIconBox"><SearchIcon/></div>
                    <div className="navbar_mic"><KeyboardVoiceIcon /></div>
                </div>
            </div>
            <div className="navbar-right">
                <Link to={"/123/upload"} >
                   <VideoCallIcon sx={{fontSize:"30px",cursor:"pointer",color:"white"}}/>
                </Link>
                <NotificationsIcon sx={{fontSize:"30px",cursor:"pointer",color:"white"}}/>
                <img onClick={handleClickModel} className="navbar-right-logo" src={userpic}alt="logo" />
                {navbarModel &&
                  <div className="navbar-model">
                    {isLogedIn}&&
                    {isLogedIn && <div onClick={handleProfile} className="navbar-model-option">Profile</div>}
                    {isLogedIn && <div className="navbar-model-option" onClick={()=>onclickPopUp("logout")} >Logout</div>}
                   {!isLogedIn &&<div className="navbar-model-option" onClick={()=>onclickPopUp("login")} >Login</div>}
                  </div>
                  
                }
            </div>
            {login && <Login setLoginModel={setLoginModel}/>}

            
        </div>
    )
}
export default Navbar;
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThbJtA59VKWBURvJ8Vf6B6t7oihcwM0m649QTLO0HD7xry4OtdGwyQcIbEZqI8_Qc4QIU&usqp=CAU