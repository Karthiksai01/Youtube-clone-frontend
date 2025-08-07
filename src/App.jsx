import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/home'
import Video from './pages/Video/video';
import Profile from './pages/Profile/profile';
import VideoUpload from './pages/VideoUpload/videoUpload';
import SignUp from './components/Signup/signUp';
import { useState,useEffect} from 'react';
import {Route,Routes} from 'react-router-dom';
import axios from 'axios';
function App() {
  const [sideNavbar,setSideNavbar]=useState(true);
  //useEffect(()=>{
    //axios.get('https://youtube-clone-backend-va2g.onrender.com
    ///api/allvideos').then(res=>{
      //console.log(res)
    //}).catch(err=>{
      //console.log(err);
    //})
  //},[])


  const setSideNavbarFunc=(value)=>{
    setSideNavbar(value)
  }
  
  return (
    <>
      <div className='App'>
        <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar}/>
        <Routes>
          <Route path='/' element={<Home sideNavbar={sideNavbar}/>} />
          <Route path='/watch/:id' element={<Video/>}/>
          <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar}/>}/>
          <Route path='/:id/upload' element={<VideoUpload/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
        
        

      </div>
    </>
  )
}

export default App
