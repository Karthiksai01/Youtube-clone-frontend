import React from 'react'
import SideNavbar from '../../components/SideNavbar/sideNavbar'
import HomePage from '../../components/HomePage/homePage'
import './home.css'
import sideNavbar from '../../components/SideNavbar/sideNavbar'

const home = ({sideNavbar}) => {
  return (
    <div className='home'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <HomePage sideNavbar={sideNavbar}/>
    </div>
  )
}
export default home;